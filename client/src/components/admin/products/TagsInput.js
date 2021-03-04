import React from 'react';
import './style.scss';

const TagsInput = (props) => {

   const addTags = event => {
        if (event.target.value.trim() !== "" && event.target.value.trim() !== ",") {
            props.setFdata({...props.fData, pKeywords: [...props.fData.pKeywords, event.target.value.replace(',','').trim()]})
            event.target.value = "";
        }
    };

    const removeTags = indexToRemove => {
        props.setFdata({...props.fData, pKeywords: [...props.fData.pKeywords.filter((_, index) => index !== indexToRemove)]})
    };

   return (
        <div className="tags-input font-medium">
            <ul id="tags">
                {props.fData.pKeywords ? 
                props.fData.pKeywords.map((tag, index) => (
                    
                    <li key={index} className="tag">
                        <span className='tag-title'>{tag}</span>
                        <span className='tag-close-icon'
                            onClick={() => removeTags(index)}
                        >
                            x
                        </span>
                    </li>
                ))
                : ""
                }
            </ul>
            <input
                className="px-4 py-2 border focus:outline-none"
                type="text"
                onKeyUp={event => event.key === "ArrowRight" || event.key === "," ? addTags(event) : null}
                placeholder="Press the right arrow to add tags"
            />
        </div>
   )
}
export default TagsInput