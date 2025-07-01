import React, { useState } from 'react';
import styles from './HistoryPage.module.css';
import { FaBars, FaSearch, FaRegCommentDots } from 'react-icons/fa';

const documents = [
  { name: 'Document TEST.pdf', date: '30/06/2025', selected: true },
  { name: 'Document ....pdf', date: '30/06/2025', selected: false },
  { name: 'Document ....pdf', date: '30/06/2025', selected: false },
  { name: 'Document ....pdf', date: '30/06/2025', selected: false },
];

export default function HistoryPage() {
  const [search, setSearch] = useState('');

  return (
    <div className={styles.pageWrapper}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <span className={styles.topBarTitle}>Historique</span>
      </div>
      <div className={styles.container}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.searchBar}>
            <FaBars className={styles.menuIcon} />
            <input
              className={styles.searchInput}
              placeholder="Hinted search text"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <FaSearch className={styles.searchIcon} />
          </div>
          <div className={styles.docList}>
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className={doc.selected ? styles.docItemSelected : styles.docItem}
              >
                <span className={styles.docName}>{doc.name}</span>
                <span className={styles.docDate}>{doc.date}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Main content */}
        <div className={styles.main}>
          <div className={styles.header}>
            <button className={styles.button}>Menu</button>
            <button className={styles.button}>Se déconnecter</button>
          </div>
          <div className={styles.centerContent}>
            <div className={styles.iconTitleRow}>
              <FaRegCommentDots className={styles.commentIcon} />
            </div>
            <h2 className={styles.title}>
              Rendu du document <span className={styles.highlight}>TEST.pdf</span>
            </h2>
            <div className={styles.summaryCard}>
              <div className={styles.scrollableSummary}>
                <p className={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut auctor massa. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.<br/><br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut auctor massa. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.<br/><br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 