import React from 'react';
import styles from './Card.module.css';
import {Link} from 'react-router-dom'
const Card = ({ image, title, description }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image}  />
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <Link to='/contact'><button className={styles.button}>Contact us</button></Link>
      </div>
    </div>
  );
};

export default Card;
