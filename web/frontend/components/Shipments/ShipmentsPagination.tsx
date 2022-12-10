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
        <div >
            <div >
                <ButtonGroup segmented>
                    <Button onClick={() => onPagination(PaginationDirection.Prev)} icon={ArrowLeftMinor} disabled={!hasPrev} />
                    <Button onClick={() => onPagination(PaginationDirection.Next)} icon={ArrowRightMinor} disabled={!hasNext} />
                </ButtonGroup>
            </div>
            <span >
                Showing {(page - 1) * limit + count} of {total} results
            </span>
        </div>
    );
};

export default ShipmentsPagination;
