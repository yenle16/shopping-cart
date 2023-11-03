import type { FC } from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';

interface OverviewOpenTicketsProps {
  amount: number;
}

export const OverviewOpenTickets: FC<OverviewOpenTicketsProps> = (props) => {
  const { amount } = props;

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3,
        }}
      >
        <div>
          <img src="/assets/iconly/iconly-glass-paper.svg" width={48} />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="text.secondary" variant="body2">
            Open tickets
          </Typography>
          <Typography color="text.primary" variant="h4">
            {amount}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        <Button color="inherit" endIcon={<ArrowForwardIcon />} size="small">
          See all tickets
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewOpenTickets.propTypes = {
  amount: PropTypes.number.isRequired,
};
