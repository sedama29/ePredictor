import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryLine, VictoryArea, VictoryContainer, VictoryZoomContainer} from 'victory-native';
import axios from 'axios';
import * as d3 from 'd3';
import { styles } from '../style/style_graph_view';
// import CustomBackground from './CustomBackground';
import  CustomZoomBackgroundContainer from './CustomZoomBackgroundContainer';


const chartPadding = { top: 10, bottom: 50, left: 50, right: 50 };

const CustomCheckbox = ({ checkboxKey, isChecked, onToggle }) => {
  const handlePress = () => {
    // console.log(`Pressed Checkbox: ${checkboxKey}`);  // Debugging line
    onToggle(checkboxKey);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.checkboxContainer}>
      <View style={[
        styles.checkboxBase,
        isChecked && styles.checkboxChecked
      ]}>
        <Text style={styles.checkboxCheckmark}>{isChecked ? '✓' : ' '}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CustomLegend = ({ dataKeys, visiblePlots, togglePlot }) => {
  return (
    <View style={styles.legendContainer}>
      <View>
        {dataKeys.map((key) => {
          // console.log(`Rendering checkbox for ${key}, checked: ${visiblePlots[key]}`); 
          return (
            <View key={key} style={styles.legendItem}>
              <CustomCheckbox
                isChecked={visiblePlots[key]}
                onToggle={() => togglePlot(key)}
              />
              <Text style={{ fontSize: 8 }}>{key}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};


const GraphView = ({ siteId }) => {
  const [data, setData] = useState({});
  const [visiblePlots, setVisiblePlots] = useState({});
  const [showLegend, setShowLegend] = useState(false);
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null); 

  const screenWidth = 400;
  const screenHeight = 300;
  const today = new Date();
  const fiveHoursInMs = 7 * 60 * 60 * 1000; // milliseconds in 5 hours
  const earlierToday = new Date(today - fiveHoursInMs);
  const laterToday = new Date(today.getTime() + fiveHoursInMs);

  const formatDate_2 = d3.timeFormat("%Y-%m-%d %H:%M:%S");
  const earlierTodayFormatted = formatDate_2(earlierToday);
  const laterTodayFormatted = formatDate_2(laterToday);
  
  const handleZoom = (domain) => {
    if (domain.x) {
      // Check if domain.x is within the data range
      const [minDate, maxDate] = [startDate, endDate]; // Your data's start and end dates
      if (domain.x[0] >= minDate && domain.x[1] <= maxDate) {
        setXDomain(domain.x);
      }
    }
  };
  



  useEffect(() => {
    const fetchData = async () => {
      if (siteId) {
        try {
          
          const response = await axios.get(`https://enterococcus.today/waf/TX/others/eCount_stat_app_2/${siteId}.csv`);
          
          // Parse the CSV data
          const parseDate = d3.timeParse("%Y-%m-%d");
          // After parsing the CSV data
          const parsedData = d3.csvParse(response.data, (row) => {
          const newRow = { date: parseDate(row.date) };
          Object.keys(row).forEach(key => {
            if (key !== 'date' && row[key] !== '') {
              const value = parseFloat(row[key]);
              if (!isNaN(value)) {
                newRow[key] = value;
              }
            }
          });
          return newRow;
        });

        const filteredData = parsedData.filter(d => d.date && Object.keys(d).every(k => !isNaN(d[k])));

        // console.log("Filtered Data:", filteredData);


          const minDate = d3.min(filteredData, (d) => d.date);
          const maxDate = d3.max(filteredData, (d) => d.date);
          setStartDate(minDate);
          setEndDate(maxDate);

  
          // Transform the data into the desired format
          const transformedData = filteredData.reduce((acc, row) => {
            Object.keys(row).forEach(key => {
              if (key !== 'date') {
                if (!acc[key]) acc[key] = [];
                acc[key].push({ date: row.date, value: row[key] });
              }
            });
            return acc;
          }, {});
          // console.log("Transformed Data:", transformedData);
          

  
          // Set the fetched and transformed data to state
          setData(transformedData);
  
          // Initialize visibility state
          const initialVisibility = {};
          let count = 0; // Counter to track the number of keys processed
          Object.keys(transformedData).forEach(key => {
            initialVisibility[key] = count < 4; // Only first three keys are true
            count++;
          });
          setVisiblePlots(initialVisibility);
  
        } catch (error) {
          console.error('Error fetching graph data:', error);
        }
      }
    };
  
    fetchData();
  }, [siteId]);
  
  const formatDate = d3.timeFormat("%d %b");

  let areaPlotData = [];
  if (data["Probality_Space_high"] && data["Probality_Space_low"]) {
    areaPlotData = data["Probality_Space_high"].map((high, index) => {
      const low = data["Probality_Space_low"][index];
      return { date: high.date, y: high.value, y0: low.value };
    });
  }

  let tickValues = [];
  if (Object.keys(data).length > 0) {
    const dates = data[Object.keys(data)[0]].map(d => d.date);
    tickValues = d3.timeWeek.every(1).range(d3.min(dates), d3.max(dates));
  }

  const togglePlot = (key) => {
    setVisiblePlots(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  
  return (
    <ScrollView horizontal style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity
        style={styles.legendToggleButton}
        onPress={() => setShowLegend(!showLegend)}
      >
        <Text style = {{fontSize: 14,fontWeight: 'bold'}}>⋮</Text>
      </TouchableOpacity>
  
      {Object.keys(data).length > 0 && (
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 10, y: 10 }}
          padding={chartPadding}
          width={screenWidth}
          height={screenHeight}
          containerComponent={
            <CustomZoomBackgroundContainer 
              zoomDimension="x"
              onZoom={handleZoom}
            />
          }
          domain={{ x: [startDate, endDate] }}  
        >
          
          <VictoryAxis
            scale="time"
            tickValues={tickValues}
            tickFormat={formatDate}
            label="Date"
            style={styles.axisStyles}
          />
          <VictoryAxis
            dependentAxis
            domain={[0, 150]}
            label="Highest Count (cfu/100 ml)"
            style={styles.axisStyles}
          />
          <VictoryArea
            data={areaPlotData}
            x="date"
            y="y"
            y0="y0"
            style={{ data: { fill: "lightblue", opacity: 0.5 } }}
          />
          <VictoryLine
            x={() => new Date(earlierTodayFormatted)}
            style={{ data: { stroke: 'black', strokeWidth: 1} }}
          />

          {/* Vertical line for later today */}
          <VictoryLine
            x={() => new Date(laterTodayFormatted)}
            style={{ data: { stroke: 'black', strokeWidth: 1 } }}
          />


            
      {showLegend && (
        <CustomLegend dataKeys={Object.keys(data)} visiblePlots={visiblePlots} togglePlot={togglePlot} />
      )}
          {Object.keys(data).map((key, index) => visiblePlots[key] && (
            <VictoryLine
              key={key}
              data={data[key]}
              x="date"
              y="value"
              style={{
                data: {
                  stroke: key === 'Probality_Space_high' || key === 'Probality_Space_low' ? 'transparent' : d3.schemeCategory10[index % 10],
                  strokeDasharray: key === 'Probality_Space' ? '4, 4' : '0',
                }
              }}
            />
          ))}
        </VictoryChart>
      )}
    </ScrollView>
  );
};  

export default GraphView;