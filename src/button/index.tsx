import React, { type FC } from 'react';
import { createNameSpace } from '../utils/components';
import { ButtonProps, defaultProps } from './props';
import '../styles/common.less';
import './index.less';

const Button: FC<ButtonProps> = (p) => {
    const { n, classes } = createNameSpace('cell');
    const props = { ...defaultProps, ...p };

    return (
        <div className={classes( n() )}>
            // TODO
        </div>
    );
};

export default Button;