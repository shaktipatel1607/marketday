import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink ,useNavigate,useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
// import { customerApi } from '../../__fakeApi__/customerApi';
// import {
//   CustomerContactDetails,
//   // CustomerDataManagement,
//   // CustomerEmailsSummary,
//   CustomerInvoices,
//   // CustomerInvoicesSummary,
//   // CustomerLogs
// } from './';
import CustomerContactDetails from './CustomerContactDetails';
import CustomerInvoices from './CustomerInvoices';
// import useMounted from '../../hooks/useMounted';
import ChevronRightIcon from '../../../icons/ChevronRight';
import myApi from '../../../axios';
import PencilAltIcon from '../../../icons/PencilAlt';
import gtm from '../../../lib/gtm';
// import useSettings from '../../hooks/useSettings';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Location', value: 'location' }
];

const CustomerDetails = () => {
  // const mounted = useMounted();
  // const { settings } = useSettings();
  const [customer, setCustomer] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');
  const [name,setName] = useState("")
  const [email,setEmail] = useState(0)
  const [mobile,setMobile] = useState(0)
  const [username,setUsername] = useState() 
  const [isVerified,setIsVerified] = useState() 
  const prm = useParams()

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
  async function get_current_data(){
    try{
      const data = await myApi.get('/api/store_detail/customers/',{params:{id:prm.id}})
      console.log(data)
      setName(data.data.name)
      setEmail(data.data.email)
      setMobile(data.data.mobile)
      setUsername(data.data.username)
      setIsVerified(Boolean(data.data.is_verified))
     
    }catch(err){
      alert(err)
    }
  }

  useEffect(() => {
    get_current_data()
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  // if (!customer) {
  //   return null;
  // }

  return (
    <>
      {/* <Helmet>
        <title>Dashboard: Customer Details | Material Kit Pro</title>
      </Helmet> */}
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container >
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                {/* {customer.name} */}
                {name}
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Management
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Customers
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<PencilAltIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  to="/dashboard/customers/1/edit"
                  variant="contained"
                >
                  Edit
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'details' && (
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  // lg={settings.compact ? 6 : 4}
                  md={7}
                  // xl={settings.compact ? 6 : 3}
                  xs={12}
                >
                  <CustomerContactDetails
                    name={name}
                    email={email}
                    mobile={mobile}
                    username={username}
                    isVerified={isVerified}
                  />
                </Grid>
                <Grid
                  item
                  // lg={settings.compact ? 6 : 4}
                  md={6}
                  // xl={settings.compact ? 6 : 3}
                  xs={12}
                >
                  {/* <CustomerInvoicesSummary /> */}
                </Grid>
                <Grid
                  item
                  // lg={settings.compact ? 6 : 4}
                  md={6}
                  // xl={settings.compact ? 6 : 3}
                  xs={12}
                >
                  {/* <CustomerEmailsSummary /> */}
                </Grid>
                <Grid
                  item
                  // lg={settings.compact ? 6 : 4}
                  md={6}
                  // xl={settings.compact ? 6 : 3}
                  xs={12}
                >
                  {/* <CustomerDataManagement /> */}
                </Grid>
              </Grid>
            )}
            {currentTab === 'invoices' && <CustomerInvoices id={prm.id} />}
            {/* {currentTab === 'logs' && <CustomerLogs />} */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerDetails;