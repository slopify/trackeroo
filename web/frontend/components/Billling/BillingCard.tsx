import React, { useMemo } from 'react';
import { Card, List, Thumbnail, Stack, Button } from '@shopify/polaris';


interface TBillingCardButton {
    content: string;
    active: boolean;
    onAction: () => any;
    loading?: boolean;
    disabled?: boolean;
}

interface TBillingCardProps {
    name: string;
    title: string;
    price: number;
    description: React.ReactNode;
    benefitList: string[];
    img: string;
    isChecked?: boolean;
    button: TBillingCardButton;
}

interface TitleBlockProps {
    title: string;
    price: number;
    description: React.ReactNode;
    img: string;
}

const TitleBlock: React.FC<TitleBlockProps> = ({ title, price, description, img }) => {
    return (
        <Stack>
            <Thumbnail size="large" source={img} alt="" />
            <div >
                <p >{title.toUpperCase()}</p>
                <p >
                    <span >$</span>
                    <span >{price}</span>
                    <span >/ mo</span>
                </p>
                <div >{description}</div>
            </div>
        </Stack>
    );
};

const BillingCard: React.FC<TBillingCardProps> = ({ benefitList, isChecked = false, button, ...props }) => {
    const { active, ...buttonProps } = button;
    const title = useMemo(() => <TitleBlock {...props} />, [props]);

    return (
        <div>
            <Card
                title={title}
                primaryFooterAction={{
                    ...buttonProps,
                    disabled: active ? true : buttonProps.disabled,
                }}
            >
                <Card.Section>
                    <List>
                        {benefitList.map((benefit) => (
                            <List.Item key={benefit}>{benefit}</List.Item>
                        ))}
                    </List>
                </Card.Section>
                <Card.Section>
                </Card.Section>
            </Card>
        </div>
    );
};

export default BillingCard;
