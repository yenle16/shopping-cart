import type { FC } from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  senderAvatar: string;
  senderName: string;
  senderOnline?: boolean;
}

interface OverviewInboxProps {
  messages: Message[];
}

export const OverviewInbox: FC<OverviewInboxProps> = (props) => {
  const { messages } = props;

  return (
    <Card>
      <CardHeader
        title="Inbox"
        action={
          <IconButton color="inherit">
            <RefreshIcon />
          </IconButton>
        }
      />
      <List disablePadding>
        {messages.map((message) => {
          return (
            <ListItem
              key={message.id}
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemAvatar>
                {message.senderOnline ? (
                  <Badge
                    anchorOrigin={{
                      horizontal: 'right',
                      vertical: 'bottom',
                    }}
                    color="success"
                    variant="dot"
                  >
                    <Avatar src={message.senderAvatar} />
                  </Badge>
                ) : (
                  <Avatar src={message.senderAvatar} />
                )}
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    variant="subtitle2"
                  >
                    {message.senderName}
                  </Typography>
                }
                secondary={
                  <Typography
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    variant="body2"
                  >
                    {message.content}
                  </Typography>
                }
                sx={{ pr: 2 }}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions>
        <Button color="inherit" endIcon={<ArrowForwardIcon />} size="small">
          Go to chat
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewInbox.propTypes = {
  messages: PropTypes.array.isRequired,
};
