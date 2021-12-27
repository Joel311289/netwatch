read -p "- Enter page name: " name

path="src/pages/$name"

mkdir -p $path;
touch "$path/${name}Page.jsx" "$path/${name}Page.module.css";

echo "const ${name}Page = () => {
  return (
    <div className=\"container\">
      ${name}Page
    </div>
  );
};

export default ${name}Page;" > "$path/${name}Page.jsx";

echo "- Page created successfully in $path";