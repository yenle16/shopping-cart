import { subHours, subMinutes } from 'date-fns';
import { Box, Button, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { OverviewDoneTasks } from '../../../components/admin_dashboard/overview-done-tasks';
import { OverviewPendingIssues } from '../../../components/admin_dashboard/overview-pending-issues';
import { OverviewOpenTickets } from '../../../components/admin_dashboard/overview-open-tickets';
import { OverviewSubscriptionUsage } from '../../../components/admin_dashboard/overview-subscription-usage';
import { OverviewInbox } from '../../../components/admin_dashboard/overview-inbox';
import AdminSidebar from '../../../components/admin_sidebar/AdminSidebar';
import { useState } from 'react';

const now = new Date();

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box maxWidth="100vw">
      <Box className="flex flex-col h-screen">
        <Box className="flex">
          <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Box flex={1}>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 8,
              }}
            >
              {/* <Container maxWidth={settings.stretch ? false : 'xl'}> */}
              <Container>
                <Grid
                  container
                  disableEqualOverflow
                  spacing={{
                    xs: 3,
                    lg: 4,
                  }}
                >
                  <Grid xs={12}>
                    <Stack direction="row" justifyContent="space-between" spacing={4}>
                      <div>
                        <Typography variant="h4">Overview</Typography>
                      </div>
                      <div>
                        <Stack direction="row" spacing={4}>
                          <Button startIcon={<AddIcon />} variant="contained">
                            New Dashboard
                          </Button>
                        </Stack>
                      </div>
                    </Stack>
                  </Grid>
                  <Grid xs={12} md={4}>
                    <OverviewDoneTasks amount={31} />
                  </Grid>
                  <Grid xs={12} md={4}>
                    <OverviewPendingIssues amount={12} />
                  </Grid>
                  <Grid xs={12} md={4}>
                    <OverviewOpenTickets amount={5} />
                  </Grid>
                  <Grid xs={12} md={7}>
                    <OverviewSubscriptionUsage
                      chartSeries={[
                        {
                          name: 'This year',
                          data: [40, 37, 41, 42, 45, 42, 36, 45, 40, 44, 38, 41],
                        },
                        {
                          name: 'Last year',
                          data: [26, 22, 19, 22, 24, 28, 23, 25, 24, 21, 17, 19],
                        },
                      ]}
                    />
                  </Grid>
                  <Grid xs={12} md={5}>
                    <OverviewInbox
                      messages={[
                        {
                          id: 'b91cbe81ee3efefba6b915a7',
                          content: 'Hello, we spoke earlier on the phone',
                          createdAt: subMinutes(now, 2),
                          senderAvatar: '/assets/avatars/avatar-alcides-antonio.png',
                          senderName: 'Alcides Antonio',
                          senderOnline: true,
                        },
                        {
                          id: 'de0eb1ac517aae1aa57c0b7e',
                          content: 'Is the job still available?',
                          createdAt: subMinutes(now, 56),
                          senderAvatar: '/assets/avatars/avatar-marcus-finn.png',
                          senderName: 'Marcus Finn',
                          senderOnline: false,
                        },
                        {
                          id: '38e2b0942c90d0ad724e6f40',
                          content: 'What is a screening task? I’d like to',
                          createdAt: subHours(subMinutes(now, 23), 3),
                          senderAvatar: '/assets/avatars/avatar-carson-darrin.png',
                          senderName: 'Carson Darrin',
                          senderOnline: true,
                        },
                        {
                          id: '467505f3356f25a69f4c4890',
                          content: 'Still waiting for feedback',
                          createdAt: subHours(subMinutes(now, 6), 8),
                          senderAvatar: '/assets/avatars/avatar-fran-perez.png',
                          senderName: 'Fran Perez',
                          senderOnline: true,
                        },
                        {
                          id: '7e6af808e801a8361ce4cf8b',
                          content: 'Need more information about campaigns',
                          createdAt: subHours(subMinutes(now, 18), 10),
                          senderAvatar: '/assets/avatars/avatar-jie-yan-song.png',
                          senderName: 'Jie Yan Song',
                          senderOnline: false,
                        },
                      ]}
                    />
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
