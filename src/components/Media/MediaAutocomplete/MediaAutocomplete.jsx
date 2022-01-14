import { useMemo, useRef, useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import Input from '@components/UI/Input/Input';
import MediaAutocompleteItem from '@components/Media/MediaAutocomplete/MediaAutocomplete-item';

import { getSearch } from '@services/global/get-search';

import { string } from '@utils/helpers/strings';

import styles from '@components/Media/MediaAutocomplete/MediaAutocomplete.module.css';
import { truncateArray } from '@utils/helpers/arrays';
import {routeMediaDetail} from '@services/helpers';

const MediaAutocomplete = () => {
  const { tablet } = useBreakpointViewport();
  const [searchOpened, setSearchOpened] = useState(!tablet);

  const onSearchOpened = () => setSearchOpened((prev) => !prev);

  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Busca una película, serie...',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: ({ query }) => {
          return getSearch(`/api/search/multi?query=${query}`).then((items) => {
            return [
              {
                sourceId: 'results',
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
        <Input
          ref={inputRef}
          name="search"
          clear
          icon={icon}
          {...{ focused: tablet && searchOpened }}
          onClickIcon={onSearchOpened}
          {...inputProps}
        />
      </div>
    );
  };

  const ButtonSearch = () => {
    return (
      <button className={styles['autocomplete-button']} onClick={onSearchOpened}>
        <FiSearch />
      </button>
    );
  };

  return (
    <div className="autocomplete-wrapper">
      <form ref={formRef} {...formProps}>
        {!tablet && InputSearch(<FiSearch />)}

        {tablet && ButtonSearch()}

        {tablet && searchOpened && InputSearch(<FiArrowLeft />, styles.full)}

        {autocompleteState.isOpen && (
          <div ref={panelRef} {...autocomplete.getPanelProps()}>
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection;

              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <div className={styles['autocomplete-result']} {...autocomplete.getListProps()}>
                      {truncateArray(items, 5).map((item) => (
                        <MediaAutocompleteItem key={item.id} to={routeMediaDetail(item)} styles={styles} {...item} />
                      ))}
                    </div>
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
  name: PropTypes.string
};

export default MediaAutocomplete;
