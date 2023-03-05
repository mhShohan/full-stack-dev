import {
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import BootCampCard from '../components/BootCampCard';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const BootCampPage = () => {
  const [bootCamps, setBootCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderMax, setSliderMax] = useState(25000);
  const [sliderMin, setSliderMin] = useState(0);
  const [priceRange, setPriceRange] = useState([sliderMin, sliderMax]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState(false);

  const history = useNavigate();
  const location = useLocation();

  const params = location.search ? location.search : null;

  const handleInputChange = (e, type) => {};

  //sorting
  const handleSortChange = (e) => {
    console.log(e.target.value);

    if (e.target.value === 'descending') {
      setSort((prev) => !prev);
      setBootCamps((prev) => {
        return prev.sort((a, b) => b.price - a.price);
      });
    }
    if (e.target.value === 'ascending') {
      setSort((prev) => !prev);
      setBootCamps((prev) => {
        return prev.sort((a, b) => a.price - b.price);
      });
    }
  };
  useEffect(() => {}, [sort]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let query;

        if (params && !filter) {
          query = params;
        } else {
          query = filter;
        }
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/bootcamps${query}`
        );
        setSliderMax(data.priceRange.maxPrice);
        setSliderMin(data.priceRange.minPrice);
        setBootCamps(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [filter, params, sliderMax, sliderMin]);

  //filtering
  const onChangeCommittedHandler = (e, newVal) => {
    buildRangeFilter(newVal);
  };

  const buildRangeFilter = (newVal) => {
    const urlFilter = `?price[gte]=${newVal[0]}&price[lte]=${newVal[1]}`;
    setFilter(urlFilter);
    history(urlFilter);
  };

  return (
    <Container className="root">
      {/* Filtering Parts  */}
      <Paper className="paper">
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom variant="h5">
              Filter
            </Typography>
            <div>
              <Slider
                min={sliderMin}
                max={sliderMax}
                disabled={loading}
                value={priceRange}
                valueLabelDisplay="auto"
                onChange={(e, newVal) => setPriceRange(newVal)}
                onChangeCommitted={onChangeCommittedHandler}
              />
              <div>
                <TextField
                  size="small"
                  id="lower"
                  label="Min Price"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={priceRange[0]}
                  onChange={(e) => handleInputChange(e, 'lower')}
                />
                <TextField
                  size="small"
                  id="upper"
                  label="Max Price"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={priceRange[1]}
                  onChange={(e) => handleInputChange(e, 'upper')}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} className="filter">
            <Typography gutterBottom>Sort By</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-level="price-order"
                name="price-order"
                onChange={handleSortChange}
              >
                <FormControlLabel
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Highest - Lowest"
                  value="descending"
                />
                <FormControlLabel
                  disabled={loading}
                  control={<Radio />}
                  value="ascending"
                  label="Price: Lowest - Highest"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      {/* BootCamp Listing  */}
      <Grid container spacing={2}>
        {loading ? (
          <div className="loader">
            <CircularProgress size="5rem" thickness={5} />
          </div>
        ) : (
          bootCamps.map((bootCamp) => (
            <Grid item key={bootCamp._id} xs={12} sm={6} md={4} lg={3}>
              <BootCampCard bootCamp={bootCamp} />
            </Grid>
          ))
        )}
      </Grid>
      <div className="flex">
        <Link to="/create" className="btn">
          Create New
        </Link>
      </div>
    </Container>
  );
};

export default BootCampPage;
