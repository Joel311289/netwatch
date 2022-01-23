import { useEffect, useMemo, useRef, useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

import Input from '@components/UI/Input/Input';
import MediaAutocompleteItem from '@components/Media/MediaAutocomplete/MediaAutocomplete-item';

import { routeMediaDetail } from '@services/helpers';
import { getSearch } from '@services/global/get-search';

import { string } from '@utils/helpers/strings';
import { truncateArray } from '@utils/helpers/arrays';

import styles from '@components/Media/MediaAutocomplete/MediaAutocomplete.module.css';

const MediaAutocomplete = ({ onClose }) => {
  const truncateLength = 5;
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  });

  useEffect(() => {
    if (autocompleteState.activeItemId >= truncateLength) {
      setAutocompleteState((prev) => ({
        ...prev,
        activeItemId: prev.activeItemId % truncateLength
      }));
    }
  }, [autocompleteState.activeItemId]);

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        id: 'autocomplete',
        placeholder: 'Busca una película, serie...',
        onStateChange: ({ state }) => setAutocompleteState(state),
        autoFocus: true,
        getSources: ({ query }) => {
          return getSearch(`/api/search/multi?query=${query}`).then((items) => {
            return [
              {
                sourceId: 'results',
                getItemUrl: ({ item }) => routeMediaDetail(item),
                getItems: () => {
                  return items;
                }
              }
            ];
          });
        }
      }),
    []
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
  });

  const InputSearch = (icon, className) => {
    return (
      <div className={`${styles['autocomplete-input']} ${string(className)}`}>
        <Input ref={inputRef} name="search" clear icon={icon} {...inputProps} focused />
      </div>
    );
  };

  return (
    <div className="autocomplete-wrapper">
      <form ref={formRef} {...formProps}>
        {InputSearch(<FiSearch />)}

        {autocompleteState.isOpen && (
          <div ref={panelRef} {...autocomplete.getPanelProps()}>
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection;

              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul className={styles['autocomplete-result']} {...autocomplete.getListProps()}>
                      {truncateArray(items, truncateLength).map((item, index) => {
                        const id = `autocomplete-item-${index}`;

                        return (
                          <li
                            key={item.id}
                            id={id}
                            onClick={onClose}
                            onMouseEnter={() =>
                              setAutocompleteState((prev) => ({ ...prev, activeItemId: index }))
                            }
                          >
                            <MediaAutocompleteItem
                              to={routeMediaDetail(item)}
                              selected={autocompleteState.activeItemId === index}
                              styles={styles}
                              {...item}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
};

MediaAutocomplete.propTypes = {
  onClose: PropTypes.func
};

export default MediaAutocomplete;
