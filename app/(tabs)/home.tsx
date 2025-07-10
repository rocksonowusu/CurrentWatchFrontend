import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurrentGraph from '../../components/home/CurrentGraph';
import QuickStats from '../../components/home/QuickStats';
import RecentActivity from '../../components/home/RecentActivity';
import RoomSummary from '../../components/home/RoomSummary';
import WelcomeCard from '../../components/home/WelcomeCard';
import { homeStyles } from '../../styles/screens_css/homestyles';



export default function HomeScreen() {
  return (
    <View style={homeStyles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
        style={homeStyles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Background decorative circles */}
        <View style={homeStyles.backgroundCircles}>
          <View style={[homeStyles.circle, homeStyles.circle1]} />
          <View style={[homeStyles.circle, homeStyles.circle2]} />
          <View style={[homeStyles.circle, homeStyles.circle3]} />
        </View>
        
        <SafeAreaView style={homeStyles.safeArea}>
          <ScrollView 
            style={homeStyles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={homeStyles.scrollContent}
          >
            <WelcomeCard />
            <CurrentGraph />
            <RoomSummary />
            <QuickStats />
            {/* <RecentActivity /> */}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
