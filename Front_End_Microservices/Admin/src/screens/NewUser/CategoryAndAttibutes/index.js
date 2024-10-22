import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./CategoryAndAttibutes.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Tooltip from "../../../components/Tooltip";
import Checkbox from "../../../components/Checkbox";
// import TagsInput from "react-tagsinput";
// import "react-tagsinput/react-tagsinput.css";

const compatibility = [
  { id: 0, title: "Sketch" },
  { id: 1, title: "WordPress" },
  { id: 2, title: "Procreate" },
  { id: 3, title: "Figma" },
  { id: 4, title: "HTML" },
  { id: 5, title: "Illustrator" },
  { id: 6, title: "Adobe XD" },
  { id: 7, title: "Keynote" },
  { id: 8, title: "Framer" },
  { id: 9, title: "Photoshop" },
  { id: 10, title: "Maya" },
  { id: 11, title: "In Design" },
  { id: 12, title: "Cinema 4D" },
  { id: 13, title: "Blender" },
  { id: 14, title: "After Effect" },
];

const optionsCategory = ["Select category", "Category 1", "Category 2"];

const CategoryAndAttibutes = ({ className }) => {
  const [category, setCategory] = useState(optionsCategory[0]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [tags, setTags] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  // const handleTagsChange = (newTags) => {
  //   setTags(newTags);
  // };

  return (
    <Card
      className={cn(styles.card, className)}
      title="Category & attributes"
      classTitle="title-purple"
    >
      <div className={styles.images}>
        <Dropdown
          className={styles.field}
          label="Category"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          value={category}
          setValue={setCategory}
          options={optionsCategory}
        />
        <div className={styles.label}>
          Compatibility{" "}
          <Tooltip
            className={styles.tooltip}
            title="Maximum 100 characters. No HTML or emoji allowed"
            icon="info"
            place="right"
          />
        </div>
        <div className={styles.list}>
          {compatibility.map((x, index) => (
            <Checkbox
              className={styles.checkbox}
              content={x.title}
              value={selectedFilters.includes(x.id)}
              onChange={() => handleChange(x.id)}
              key={index}
            />
          ))}
        </div>
        
        {/* <div className={styles.tags}>
          <TagsInput
            value={tags}
            onChange={handleTagsChange}
            inputProps={{ placeholder: "Enter tags to describe your item" }}
            onlyUnique={true}
            addOnBlur={true}
            maxTags={12}
          />
        </div> */}
      </div>
    </Card>
  );
};

export default CategoryAndAttibutes;
