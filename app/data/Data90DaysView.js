import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import axios from 'axios';
import Papa from 'papaparse';
import { styles } from '../style/style_home'; // Adjust the path as needed

const Data90DaysView = ({ siteId }) => {
    const [data, setData] = useState([]);
    const handleLinkPress = () => {
        Linking.openURL('https://enterococcus.today/home.php');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://enterococcus.today/waf/TX/others/data_90_days/${siteId}.csv`);
                Papa.parse(response.data, {
                    header: true,
                    complete: (results) => {
                        setData(results.data);
                    }
                });
            } catch (error) {
                console.error('Error fetching CSV data:', error);
            }
        };

        if (siteId) {
            fetchData();
        }
    }, [siteId]);


    const getColorForLevel = (level) => {
        switch (level) {
            case 'Low':
                return 'green';
            case 'Medium':
                return 'orange';
            case 'High':
                return 'red';
            default:
                return 'black'; // Default color
        }
    };

    return (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 11 }}>Last 90 days </Text>
            <Text style={styles.descriptionText}>
                For more detailed information and to download the data, visit {' '}
                <Text style={styles.linkText} onPress={handleLinkPress}>
                    https://enterococcus.today/home.php.
                </Text>
            </Text>
            <View style={styles.tableHeader}>
                <Text style={[styles.headerText, styles.column]}>Date</Text>
                <Text style={[styles.headerText, styles.column]}>Time</Text>
                <Text style={[styles.headerText, styles.column]}>Count</Text>
                <Text style={[styles.headerText, styles.column]}>Level</Text>
            </View>
            <ScrollView>
                {data.map((row, index) => (
                    <View key={index} style={styles.dataRow}>
                        <Text style={styles.column}>{row.Date}</Text>
                        <Text style={styles.column}>{row.Time}</Text>
                        <Text style={styles.column}>{row.Count}</Text>
                        <Text style={[styles.column, { color: getColorForLevel(row.Level) }]}>
                            {row.Level}
                        </Text>                    
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Data90DaysView;