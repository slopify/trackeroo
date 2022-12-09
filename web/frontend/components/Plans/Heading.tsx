import React from 'react';
import { DisplayText, TextStyle } from '@shopify/polaris';


interface HeadingProps {
    subtext?: string;
    element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    color?: string;
    size?: 'medium' | 'extraLarge' | 'large';
}

const Heading: React.FC<HeadingProps> = ({ children, subtext, element = 'h2', color, size = 'large' }) => {
    return (
        <div>
            <DisplayText size={size} element={element}>
                <span style={{ color }}>{children}</span>
            </DisplayText>
            {subtext && <TextStyle variation="subdued">{subtext}</TextStyle>}
        </div>
    );
};

export default Heading;
