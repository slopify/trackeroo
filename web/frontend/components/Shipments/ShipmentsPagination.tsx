import React from 'react';
import { Button, ButtonGroup } from '@shopify/polaris';
import { ArrowLeftMinor, ArrowRightMinor } from '@shopify/polaris-icons';
import { PaginationDirection } from '../../constants/constants';

interface ShipmentsPaginationProps {
    onPagination(PAGINATION_DIRECTIONS): void;

    total: number;
    count: number;
    hasNext: boolean;
    hasPrev: boolean;
    page: number;
    limit: number;
}

const styles = {
    ShipmentsPagination: {
        borderTop: '1px solid grey',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 30px',
    },
    ShipmentsPaginationButtons: {
        margin: '0 auto',
        maxWidth: '36px',
    },
    ShipmentsPaginationCount : {
        color: 'grey',
        fontSize: '12px',
        fontWeight: '600',
        letterSpacing: '.4px',
    }
}


const ShipmentsPagination: React.FC<ShipmentsPaginationProps> = ({
    page,
    limit,
    count,
    total,
    onPagination,
    hasNext,
    hasPrev,
}) => {
    return (
        <div style={styles.ShipmentsPagination}>
        <div style={styles.ShipmentsPaginationButtons}>
                <ButtonGroup segmented>
                    <Button onClick={() => onPagination(PaginationDirection.Prev)} icon={ArrowLeftMinor} disabled={!hasPrev} />
                    <Button onClick={() => onPagination(PaginationDirection.Next)} icon={ArrowRightMinor} disabled={!hasNext} />
                </ButtonGroup>
            </div>
            <span style={styles.ShipmentsPaginationCount}>
                Showing {(page - 1) * limit + count} of {total} results
            </span>
        </div>
    );
};

export default ShipmentsPagination;
