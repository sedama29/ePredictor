import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Dimensions, Modal, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './style/style_home';
import Data90DaysView from './data/Data90DaysView';
import ContactDetailsView from './data/ContactDetailsView';
import GraphView from './Graph/GraphView';
import { FontAwesome } from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap} from 'react-native-tab-view';
import MapImage1 from '../assets/images/map_images/JEF.jpg';
import MapImage2 from '../assets/images/map_images/GAL.jpg';
import MapImage3 from '../assets/images/map_images/BRA.jpg';
import MapImage4 from '../assets/images/map_images/NUE.jpg';
import MapImage5 from '../assets/images/map_images/CAM.jpg';

const initialLayout = { width: Dimensions.get('window').width };


const Home = () => {
  const [siteOptions, setSiteOptions] = useState([]);
  const [selectedSite, setSelectedSite] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [coordsDict, setCoordsDict] = useState({});
  const [contactDetails, setContactDetails] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [observedData, setObservedData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isCamModalVisible, setCamModalVisible] = useState(false);
  const [isPickerModalVisible, setPickerModalVisible] = useState(false);

  const renderPickerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.pickerItem}
      onPress={() => {
        setSelectedSite(item.match(/\(([^)]+)\)/)?.[1]);
        setPickerModalVisible(false);
      }}>
      <Text style={styles.pickerText}>{item}</Text>
    </TouchableOpacity>
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const touchAreas = [
    { x: [130, 150], y: [320, 340], image: MapImage5 },
    { x: [125, 145], y: [205, 225], image: MapImage4 },
    { x: [240, 260], y: [105, 125], image: MapImage3 },
    { x: [265, 285], y: [85, 105], image: MapImage2 },
    { x: [310, 330], y: [55, 75], image: MapImage1 },
  ];

  const handleMapPress = (evt) => {
    const { locationX, locationY } = evt.nativeEvent;

    for (const touchArea of touchAreas) {
      if (
        locationX >= touchArea.x[0] && locationX <= touchArea.x[1] &&
        locationY >= touchArea.y[0] && locationY <= touchArea.y[1]
      ) {
        setSelectedImage(touchArea.image);
        setImageModalVisible(false);
        setCamModalVisible(true);
        return;
      }
    }
  };

  // Specific touch areas for each image
  const specificTouchAreas = {
    MapImage1: [
      { x: [135, 155], y: [165, 185], site: 'JEF012' },
      { x: [180, 200], y: [142, 162], site: 'JEF009' },
      { x: [205, 225], y: [140, 160], site: 'JEF013' },
    ],
    MapImage2: [
      { x: [235, 255], y: [75, 95], site: 'GAL038' },
      { x: [168, 188], y: [133, 153], site: 'GAL037' },
      { x: [95, 115], y: [220, 240], site: 'GAL036' },    
    ],
    MapImage3: [
      { x: [230, 250], y: [65, 85], site: 'BRA012' },
      { x: [215, 235], y: [85, 105], site: 'BRA011' },
      { x: [108, 128], y: [255, 275], site: 'BRA010' },    
    ],
    MapImage4: [
      { x: [187, 207], y: [110, 130], site: 'NUE014' },
      { x: [165, 185], y: [180, 200], site: 'NUE015' },
      { x: [150, 170], y: [242, 262], site: 'NUE016' },    
    ],
    MapImage5: [
      { x: [170, 190], y: [95, 115], site: 'CAM011' },
      { x: [178, 198], y: [150, 170], site: 'CAM030' },
      { x: [185, 205], y: [200, 220], site: 'CAM010' },    
    ],
  };

  const handleCamPress = (evt) => {
    const { locationX, locationY } = evt.nativeEvent;
  
    // Determine the current image based on the selectedImage state
    let currentImageKey = null;
    if (selectedImage === MapImage1) {
      currentImageKey = 'MapImage1';
    } else if (selectedImage === MapImage2) {
      currentImageKey = 'MapImage2';
    }
    else if (selectedImage === MapImage3) {
      currentImageKey = 'MapImage3';
    }
    else if (selectedImage === MapImage4) {
      currentImageKey = 'MapImage4';
    }
    else if (selectedImage === MapImage5) {
      currentImageKey = 'MapImage5';
    }
  
    if (currentImageKey && specificTouchAreas[currentImageKey]) {
      const touchAreas = specificTouchAreas[currentImageKey];
  
      for (const touchArea of touchAreas) {
        if (
          locationX >= touchArea.x[0] && locationX <= touchArea.x[1] &&
          locationY >= touchArea.y[0] && locationY <= touchArea.y[1]
        ) {
          setSelectedSite(touchArea.site);
          setCamModalVisible(false);
          return;
        }
      }
    }

    // Common touch area (if needed)
    const commonTouchArea = {
      x: [270, 350],
      y: [270, 350],
    };

    if (
      locationX >= commonTouchArea.x[0] && locationX < commonTouchArea.x[1] &&
      locationY >= commonTouchArea.y[0] && locationY < commonTouchArea.y[1]
    ) {
      // Add any common action if required
      setCamModalVisible(false);
      setImageModalVisible(true);
    }
  };


  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'observed', title: `Observed (${observedData.length})` },
    { key: 'predicted', title: `Predicted (${predictedData.length})` },
  ]);

  const csvToJson = (csv) => {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    return result;
  };

  useEffect(() => {
    const fetchCSVData = async (url) => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        return csvToJson(text);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };
    const fetchData = async () => {
      const observed = await fetchCSVData('https://enterococcus.today/waf/TX/others/observed.csv');
      const predicted = await fetchCSVData('https://enterococcus.today/waf/TX/others/predicted.csv');

      setObservedData(observed);
      setPredictedData(predicted);
      setTotalCount(observed.length + predicted.length); // Or calculate based on your data structure
    };
    fetchData();
  }, []);

  const ObservedTab = () => (
    <ScrollView>
      {observedData.map((item, idx) => (
        <Text key={idx} style={styles.bulletText}>
          • <Text style={styles.boldText}>{item.site_name} ({item.site_id}) :</Text>
          {' '}The observed count is {item.eCount} cfu/100ml on {item.date} and this count is {' '}
          <Text style={[styles.levelText, { color: item.level === 'MEDIUM' ? 'orange' : item.level === 'HIGH' ? 'red' : 'black' }]}>
            {item.level}
          </Text>
        </Text>
      ))}
    </ScrollView>
  );

  const PredictedTab = () => (
    <ScrollView>
      {predictedData.map((item, idx) => {
        const level = item.eCount < 104 ? '>35' : '>104';
        return (
          <Text key={idx} style={styles.bulletText}>
            • <Text style={styles.boldText}>{item.site_name} ({item.site_id}) :</Text>
            {' '}The count is predicted by {item.model_id} to be {' '}
            <Text style={{ color: level === '>35' ? 'orange' : 'red' }}>
              {level}
            </Text> cfu/100ml on {item.date}
          </Text>
        );
      })}
    </ScrollView>
  );

  useEffect(() => {
    setRoutes([
      { key: 'observed', title: `Observed (${observedData.length})` },
      { key: 'predicted', title: `Predicted (${predictedData.length})` },
    ]);
  }, [observedData, predictedData]);

  const showDataAlert = () => {
    setIsModalVisible(true);
  };

  const renderScene = SceneMap({
    observed: ObservedTab,
    predicted: PredictedTab,
  });


  useEffect(() => {
    async function fetchSiteOptions() {
      try {
        const response = await fetch('https://enterococcus.today/waf/TX/others/stations.txt');
        const text = await response.text();
        const siteArray = JSON.parse(text);
        if (Array.isArray(siteArray) && siteArray.length > 0) {
          setSiteOptions(siteArray);
          setSelectedSite(siteArray[0].match(/\(([^)]+)\)/)?.[1]); // Set the first site as default
        } else {
          console.error('Fetched data is not an array or is empty:', siteArray);
        }
      } catch (error) {
        console.error('Error fetching site data:', error);
      }
    }

    async function fetchCoords() {
      try {
        const response = await fetch('https://enterococcus.today/waf/TX/others/beach_lat_lon.txt');
        const text = await response.text();
        setCoordsDict(JSON.parse(text));
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }

    const fetchContactDetails = async () => {
      try {
        const response = await fetch('https://enterococcus.today/waf/TX/others/contact_details.json');
        const data = await response.json();
        setContactDetails(data);
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };
    fetchContactDetails();
    fetchSiteOptions();
    fetchCoords();
  }, []);

  useEffect(() => {
    if (selectedSite) {
      const imageSrc = `https://enterococcus.today/waf/TX/others/beach_images/${selectedSite}.jpg`;
      setImageUrl(imageSrc);
    }
  }, [selectedSite]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={showDataAlert} style={styles.alertButton}>
        <Text style={styles.alertText}>({totalCount}) Alert!</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}

          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={{ color: 'white' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>



    <Modal
        visible={isPickerModalVisible}
        onRequestClose={() => setPickerModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.dropdownContainer}>
            <FlatList
              data={siteOptions}
              renderItem={renderPickerItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.dropdownList}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.pickerAndDotsContainer}>
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          onPress={() => setPickerModalVisible(true)}
          style={styles.pickerButton}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <Text style={{ color: 'blue' , padding: 5}}>
              {selectedSite ? siteOptions.find(item => item.match(/\(([^)]+)\)/)?.[1] === selectedSite) : 'Select Site'}
            </Text>
            {/* <FontAwesome name="caret-down" size={20} color="black"  style={{ right:5 }}/> */}
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setImageModalVisible(true)} style={styles.dotsButton}>
        <Text>⋮</Text>
      </TouchableOpacity>
    </View>

      <Text style={{ marginTop: 30, fontSize: 14, fontWeight: 'bold' }}>Enterococcus Counts</Text>
      {selectedSite && <GraphView siteId={selectedSite} />}


      <Text style={{ marginTop: 30, fontSize: 14, fontWeight: 'bold' }}>Data</Text>
      <View>
        <ScrollView contentContainerStyle={styles.container_data}>
          {selectedSite && <Data90DaysView siteId={selectedSite} />}
        </ScrollView>
      </View>

      <Text style={{ marginTop: 30, fontSize: 14, fontWeight: 'bold' }}>Location</Text>
      <View style={styles.container_location}>
        {selectedSite && coordsDict[selectedSite] && (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
            <Text style={{ fontSize: 12 }}>
              <Text style={{ fontWeight: 'bold' }}>Latitude: </Text>
              <Text>{coordsDict[selectedSite].lat}</Text>
            </Text>
            <Text style={{ fontSize: 12, paddingLeft: 50 }}>
              <Text style={{ fontWeight: 'bold' }}>Longitude: </Text>
              <Text>{coordsDict[selectedSite].long}</Text>
            </Text>
          </View>
        )}

        <View style={styles.container_image}>
          {imageUrl && <Image source={{ uri: imageUrl }} style={styles.imageStyle} />}
        </View>
      </View>

      <Text style={{ marginTop: 30, fontSize: 14, fontWeight: 'bold' }}>Contact</Text>
      <View>
        <ScrollView contentContainerStyle={styles.container_contact}>
          {selectedSite && <ContactDetailsView details={contactDetails[selectedSite]} />}
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isImageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalView_2}>
          <TouchableOpacity onPress={handleMapPress} style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../assets/images/map_images/map_main.jpg')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setImageModalVisible(false)} style={styles.closeButton_image}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={isCamModalVisible}
        onRequestClose={() => setCamModalVisible(false)}
      >
        <View style={styles.modalView_2}>
          <TouchableOpacity onPress={handleCamPress} style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
            {selectedImage && (
              <Image
                source={selectedImage}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton_image}
            onPress={() => setCamModalVisible(false)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Home