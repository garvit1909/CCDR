// components/elements/ProblemCard.js

import React from 'react';
import Link from 'next/link';
import StarButton from './starButton';

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const ProblemCard = ({ problemItem, onBookmark }) => {
  if (!problemItem || !problemItem.problem) {
    return null; // Skip this item if it is null or doesn't have a problem property
  }

  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
      <div className="card-grid-2 hover-up" style={{ height: "380px" }}>
        <div className="card-grid-2-image-left">
          <span><StarButton problemId={problemItem.id} onBookmark={onBookmark} /></span>
          <div className="image-box">
            <img src="/assets/imgs/prorep (1).png" alt="jobBox" width="100" height="40" />
          </div>
          <div className="right-info">
            <Link legacyBehavior href="company-details">
              <a className="name-job">{problemItem.ids}</a>
            </Link>
            <span className="small">
              <i className="fas fa-globe" style={{ marginRight: '5px', fontSize: '12px' }}></i> {problemItem.domain}
            </span>
          </div>
        </div>
        <div className="card-block-info">
          <h4>
            <Link legacyBehavior href="/job-details">
              <a>{problemItem.title}</a>
            </Link>
          </h4>
          <div className="mt-5">
            <span className="card-briefcase">{problemItem.funding}</span>
            <span className="card-time">
              <span>{problemItem.date}</span>
            </span>
          </div>
          <p className="font-sm color-text-paragraph mt-10" style={{ height: '60px', overflow: 'hidden' }}>
            {truncateText(problemItem.problem, 10)}
          </p>
          <div className="card-2-bottom mt-20">
            <div className="row">
              <div className="col-lg-6 col-6">
                <div className="d-flex">
                  <img className="img-rounded" src="assets/imgs/page/homepage1/user1.png" alt="jobBox" />
                  <div className="info-right-img">
                    <span className="font-sm font-bold color-brand-1 op-70">{problemItem.user}</span>
                    <span className="font-xs color-text-paragraph-2">{problemItem.domain}</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-6 text-end">
                <Link legacyBehavior href="/job-details">
                  <a className="btn btn-apply-now">View Details</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
