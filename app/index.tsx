import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  const [adBlockList, setAdBlockList] = useState<string[]>([]);

  useEffect(() => {
    const fetchAdBlockList = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/hoshsadiq/adblock-nocoin-list/master/hosts.txt"
        );
        const text = await response.text();
        const lines = text.split("\n").filter((line) => line && !line.startsWith("#"));
        const domains = lines.map((line) => line.split(" ")[1]);
        setAdBlockList(domains);
      } catch (error) {
        console.error("Failed to fetch ad block list:", error);
      }
    };

    fetchAdBlockList();
  }, []);

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
