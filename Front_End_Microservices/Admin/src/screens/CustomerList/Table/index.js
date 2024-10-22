import React, { useState, useEffect } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Checkbox from "../../../components/Checkbox";
import Loader from "../../../components/Loader";
import Row from "./Row";
import userServices from "../../../services/api/users"; 

// data
import { customers } from "../../../mocks/customers";



const Table = ({ className, activeTable, setActiveTable }) => {
  const [chooseAll, setСhooseAll] = useState(false);
  const [activeId, setActiveId] = useState(customers[0].id);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [users, setUsers] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: users } = await userServices.getUsers();
        setUsers(users);
        console.log("Users: ", users);
        // setActiveId(users);  // Nếu cần cập nhật state
        // setLoading(false);   // Nếu cần cập nhật trạng thái loading
      } catch (error) {
        console.error("Error fetching users: ", error.message);
        // setLoading(false);   // Nếu cần cập nhật trạng thái loading
      }
    };

    getUser();
  }, []);

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={cn(styles.table)}>
        <div className={cn(styles.row, { [styles.active]: activeTable })}>
          <div className={styles.col}>
            <Checkbox
              className={styles.checkbox}
              value={chooseAll}
              onChange={() => setСhooseAll(!chooseAll)}
            />
          </div>
          <div className={styles.col}>Name</div>
          <div className={styles.col}>Email</div>
          <div className={styles.col}>Phone</div>
          <div className={styles.col}>Comments</div>
          <div className={styles.col}>Likes</div>
          <div className={styles.col}>Role</div>
        </div>
        {users.map((x, index) => (
          <Row
            item={x}
            key={index}
            activeTable={activeTable}
            setActiveTable={setActiveTable}
            activeId={activeId}
            setActiveId={setActiveId}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
          />
        ))}
      </div>
      {/* <div className={styles.foot}>
        <button className={cn("button-stroke button-small", styles.button)}>
          <Loader className={styles.loader} />
          <span>Load more</span>
        </button>
      </div> */}
    </div>
  );
};

export default Table;
