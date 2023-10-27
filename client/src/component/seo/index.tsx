import * as React from 'react';
import { Helmet } from 'react-helmet';
export interface ISeoProps {
    title: string;
    description: string;
}

export default function Seo(data: ISeoProps) {
    const {description,title}=data
    return (
        <div>
            <Helmet>
                {/* <!-- Primary Meta Tags --> */}
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta
                    name="description"
                    content={description}
                />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta
                    property="og:description"
                    content={description}
                />
                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={title} />
                <meta
                    property="twitter:description"
                    content={description}
                />
            </Helmet>
        </div>
    );
}
