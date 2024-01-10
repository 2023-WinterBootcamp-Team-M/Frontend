import React from 'react';
import { styled } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

interface ToolTipProps {
  title: string;
  children: React.ReactElement;
}

function ToolTip({ title, children }: ToolTipProps) {
  return <BootstrapTooltip title={title}>{children}</BootstrapTooltip>;
}

export default ToolTip;
