import {
    Badge,
    ButtonGroup,
    FullscreenBar,
    Button,
} from '@shopify/polaris';
import React from 'react';
import { useState, useCallback } from 'react';
import MultiStepProgressBar from '../MultiStepProgressBar';

const FullscreenEditor = () => {
    const [isFullscreen, setFullscreen] = useState(false);

    const handleActionClick = useCallback(() => {
        setFullscreen(false);
    }, []);

    const address = '1250 Broadway. New York';
    const productsPurchased = ["hat", "pants", "shoes"]
    const date = "December 29, 2022 at 1:37"
    const currLocation = "Atlanta, GA 30319, US"
    const shippingEvent = 'Item Leaving Facility'
    const orderNum = "#12454354"
    const productName = 'The best night of your life'
    const productImageSrc = 'https://ramblinwreck.com/imgproxy/iZVa-3JFA-jiMemM-vgiK3WlCtY7AfDDn8W-6Y6e1bY/fit/2500/2500/ce/0/aHR0cHM6Ly9yYW1ibGlud3JlY2suY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE4LzA2L1l1bi1DaHJpcy1Dcm9wcGVkLTc0MngxMDI0LmpwZw.jpg'
    const quantity = '30 min'
    const price = '$9.99'
    const estArrivalDate = 'Tonight'

    const styles = {
        farLeftCell: {
            flex: 1,
            padding: '1rem',
            textAlign: 'center',
        },
        otherCell: {
            flex: 1,
            padding: '1rem',
            textAlign: 'center',
            borderLeftColor: 'gray',
            borderLeftStyle: 'solid',
            borderLeft: '1'
        },
        active: {
            backgroundColor: 'green'
        },
        header: {
            gridColumnStart: '5',
            fontSize: '18pt',
            fontWeight: 'bold',
            padding: '15pt'
        },
        productContent: {
            padding: '25pt',
            display: 'flex'
        },
        productTitle: {
            fontSize: '12pt',
        },
        productInfo: {
            padding: '5pt',
        },
        productSubDesc: {
            color: 'darkgray',
            margin: '.3rem'
        },
        circle: {
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            padding: '8px',
            background: 'white',
            border: '2px solid #666',
            color: '#666',
            textAlign: 'center',
            font: '24px Arial, sans-serif',
            flex: 1
        }
    }



    const fullScreen = (
        <div
            style={{
                display: 'flex',
                backgroundColor: 'black',
                flexGrow: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 1rem',
                height: '100vh'
            }}>
            <div style={{
                backgroundColor: 'white',
                flexGrow: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div style={{ height: '50pt', borderBottom: '1pt solid black', backgroundColor: '#dddddd' }}>
                    <div style={{ position: 'relative', padding: '15pt 50pt 5pt 50pt' }}>
                        <MultiStepProgressBar status='intransit'></MultiStepProgressBar>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ position: 'relative', left: '3%'}}>Processing</div>
                        <div style={{ position: 'relative', left: '24%', }}>In Transit</div>
                        <div style={{ position: 'relative', left: '46%', }}>Out For Delivery</div>
                        <div style={{ position: 'relative', left: '65%' }}>Delivered</div>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <iframe width="50%" height="500" id="gmap_canvas" src={`https://maps.google.com/maps?q=${address}&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" />
                    <div style={{ width: '50%', height: "500" }}>
                        <div style={styles.header}>Order Number: {orderNum}</div>
                        <div style={styles.productContent}>
                            <div><img height='100pt' src={productImageSrc} /></div>
                            <div style={styles.productInfo}>
                                <div style={styles.productTitle}>{productName}</div>
                                <div style={styles.productSubDesc}>Quantitiy: {quantity}</div>
                                <div style={styles.productSubDesc}>Price: {price}</div>
                                <div style={styles.productSubDesc}>Estimated Arrival Date: {estArrivalDate}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexGrow: '1',
                    justifyContent: 'center',
                    borderTopColor: 'gray',
                    borderTopStyle: 'solid',
                    borderTop: '1',
                    backgroundColor: '#dddddd'
                }}>
                    <div style={{ textAlign: 'left', flex: 1, padding: '1rem' }}>
                        <div style={{ fontWeight: 'bold' }}>Last Status Update:</div>
                        {date}

                    </div>
                    <div style={{ padding: '1rem', marginLeft: '8rem', flex: '1' }}>
                        <div style={{ fontWeight: 'bold' }}>Last Location:</div>
                        {currLocation}
                    </div>
                    <div style={{ padding: '1rem', marginLeft: '8rem', flex: '1' }}>
                        <div style={{ fontWeight: 'bold' }}>Last Event:</div>
                        {shippingEvent}
                    </div>
                </div>
                <div></div>
            </div>





        </div>
    );

    const fullscreenBarMarkup = (<>
        <FullscreenBar onAction={handleActionClick}>
            <div
                style={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                }}
            >
                <Badge status="info">Draft</Badge>
                <div style={{ marginLeft: '1rem', flexGrow: 1 }}>
                    Tracking Page Editor
                </div>
                <ButtonGroup>
                    <Button primary onClick={() => { }}>
                        Save Changes
                    </Button>
                </ButtonGroup>
            </div>
        </FullscreenBar>
        {fullScreen}
    </>
    );


    return (
        <div style={{ width: '100%' }}>
            {isFullscreen && fullscreenBarMarkup}
            <div style={{ padding: '1rem' }}>
                {!isFullscreen && (
                    <Button primary onClick={() => setFullscreen(true)}>Open Editor</Button>
                )}
            </div>
        </div>
    );
}

export default FullscreenEditor;