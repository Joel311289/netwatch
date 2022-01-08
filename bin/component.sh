read -p "- Enter component name: " name

path="src/components/$name"

mkdir -p $path;
touch "$path/$name.jsx" "$path/$name.module.css";

echo "import PropTypes from 'prop-types';

import styles from '@components/$name/$name.module.css';

const $name = ({ name }) => {
  return (
    <div>
      Component {name}
    </div>
  );
};

$name.propTypes = {
  name: PropTypes.string
};

export default $name;" > "$path/$name.jsx";

echo "- Component created successfully in $path";