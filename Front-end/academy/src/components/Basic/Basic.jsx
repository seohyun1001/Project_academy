import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import LatestNotices from '../notice/LatestNotices';
import LatestRefs from '../reference/LatestRefs';

const Basic = () => {
    const [showMainContent, setShowMainContent] = useState(true);

    return (
        <div className='d-flex flex-column justify-content-between mainBody vsc-initialized'>
            <Header setShowMainContent={setShowMainContent} />
            <div className="container">
                <div className="d-flex flex-wrap">
                    {showMainContent && (
                        <>
                            <LatestNotices />
                            <LatestRefs />
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Basic;
