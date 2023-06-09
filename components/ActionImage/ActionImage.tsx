import React from 'react';
import {Box, Button} from "@chakra-ui/react";
import styles from './ActionImage.module.css'

type ActionImageProps = {
    children: React.ReactNode
    icon: JSX.Element
    onClick: () => void
    isDisabled: boolean
}

/**
 * ActionImage wraps a child image element in a container with a button
 * for interacting with the image.
 */
function ActionImage({children, icon, onClick, isDisabled}: ActionImageProps) {
    return (
        <Box className={styles.wrapper}>
            <Box bg={'gray.50'} className={styles.shadow}/>
            <Button leftIcon={icon}
                    variant='link'
                    className={styles.button}
                    onClick={onClick}
                    isDisabled={isDisabled}
                    data-testid="action-image-btn"
            />
            {children}
        </Box>
    );
}

export default ActionImage;