'use client'

import {IconDots, IconX} from "@tabler/icons-react";

export default function Thumbnail({
                                      isThumbnailsCanvas,
                                      handleSwitchResize
                                  }) {

    const thumbnails = [
        {canvas: null},
        {canvas: null},
        {canvas: null},
        {canvas: null},
        {canvas: null},
        {canvas: null},
        {canvas: null},
        {canvas: null},
        {canvas: null},
        {canvas: null}
    ]
    // 10 thumbnail

    return (<div className={`thumbnail ${isThumbnailsCanvas ? 'active' : ''}`}>
        <div className={"thumbnail-wrapper"}>
            <div className={"thumbnail-header"}>
                <h3 className={"thumbnail-title"}>Thumbnails</h3>
                <button
                    className={"thumbnail-close"}
                    onClick={() => handleSwitchResize(isThumbnailsCanvas, 'thumbnails')}
                >
                    <IconX/>
                </button>
            </div>
            <div className={"thumbnail-main scrollbar"}>
                {thumbnails.map((thumbnail, index) => (
                    <div className="thumbnail-item" key={index}>
                        <canvas
                            ref={thumbnail.canvas}
                            className="thumbnail-item__canvas"
                        />
                        <div className="thumbnail-item__header">
                            <h3 className={"title"}>Board {index}</h3>
                            <button className={"btn-more"}><IconDots/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>)

}
