import React from 'react'
import { Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';

import StockDetail from './components/StockDetail/StockDetail';
import AddStock from './components/AddStock';

import Header from './components/Header';
import "./App.css";

const App = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path='/' element={<AddStock />} />
                <Route exact path='/stock-detail:symbol' element={<StockDetail />} />
            </Routes>
        </div>
            
    )
}

export default App

        // <Container maxWidth="lg">
        //     <AppBar position="static" color="inherit">
        //         <Typography variant="h2" align="center">Stocks Tracker</Typography>
        //     </AppBar>
        //     <Grow in>
        //         <Container>
        //             <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        //                 <Grid item xs={12} sm={7}>
        //                     <Posts />
        //                 </Grid>
        //                 <Grid item xs={12} sm={4}>
        //                     <Form />
        //                 </Grid>
        //                 <Grid item xs={12} sm={12}>
        //                     <StockDetail />
        //                 </Grid>
        //             </Grid>
        //         </Container>
        //     </Grow>
        // </Container>   