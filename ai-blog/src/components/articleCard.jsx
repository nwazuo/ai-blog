// simple article card component that takes the title, publishedAt date and array of tags, and featured image and renders them nicely

// articleCard component using tailwind for styling
import React from 'react';

const ArticleCard = ({ title, publishedAt, tags, featuredImage }) => {
  return (
    <div className=" rounded-lg shadow-md">
      <img src={featuredImage} alt={title} className="mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 mb-2">{publishedAt}</p>
      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-600 rounded-full py-1 px-2 text-sm mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArticleCard;
