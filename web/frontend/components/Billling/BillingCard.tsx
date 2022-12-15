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
            <div style={{ border: '1pt solid rgba(0, 128, 96, 1);' }}>
                <img src={img} alt="" />
            </div>
            <div >
                <p styles>{title.toUpperCase()}</p>
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
        <div style={{
            marginTop: '10pt',
            minWidth: '220pt',
            minHeight: '250pt',
            backgroundColor: 'white',
            borderRadius: '20pt'
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '5pt' }}>
                <div style={{ marginTop: '15pt', borderStyle: 'solid', borderColor: 'rgba(0, 128, 96, 1)', borderWidth: '1pt' }}>
                    <Thumbnail size="large" source={props.img} alt="" />
                </div>
                <div style={{ marginTop: '15pt', }}>
                    <p style={{ fontWeight: 'bold' }}>{props.title.toUpperCase()}</p>
                    <p >
                        <span >$</span>
                        <span >{props.price}</span>
                        <span >/ mo</span>
                    </p>
                    <div >{props.description}</div>
                </div>
            </div>

            <div>
                <ul>
                    {benefitList.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                    ))}
                </ul>
            </div>
            <div style={{padding:'25pt'}}></div>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    <Button
                        primary
                        onClick={buttonProps.onAction}
                        disabled={active ? true : buttonProps.disabled}
                >{buttonProps.content}</Button>
            </div>
        </div >
    );
};

export default BillingCard;
