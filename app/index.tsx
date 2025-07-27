import { View } from "react-native";
import { WebView } from "react-native-webview";

const adBlockList = [
  "doubleclick.net",
  "googlesyndication.com",
  "googletagservices.com",
  "adservice.google.com",
  "ads.google.com",
  "google-analytics.com",
];

export default function HomeScreen() {
  return (
    <View className="w-full h-full">
      <WebView
        source={{ uri: "https://forbes.com" }}
        onShouldStartLoadWithRequest={(event) => {
          const { url } = event;
          const isAd = adBlockList.some((adDomain) => url.includes(adDomain));
          return !isAd;
        }}
      />
    </View>
  );
}
