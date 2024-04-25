import React, { useRef, useState } from "react";
import { View } from "react-native";
import Slide from "./Slide";
import PagerView from "react-native-pager-view";


const PagerViewComponent = () => {
    const pageRef = useRef<PagerView | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 0 && pageNumber <= 2) {
            setCurrentPage(pageNumber);
        }
    };
    const goToNextPage = () => {
        if (currentPage < 2) {
            handlePageChange(currentPage + 1);
            pageRef.current?.setPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            handlePageChange(currentPage - 1);
            pageRef.current?.setPage(currentPage - 1);
        }
    };
    return (
        <PagerView style={{ flex: 1 }} initialPage={0} ref={pageRef}>
            <View key={1}>
                <Slide
                    imageSource={require('../../assets/images/dashboard/waterTracking.png')}
                    title="Water Tracking"
                    description="You can irrigate your crops anywhere you're!"
                    onPressNext={goToNextPage}
                    active={1}
                />
            </View>
            <View key={2}>
                <Slide
                    imageSource={require('../../assets/images/dashboard/smartIrrigation.png')}
                    title="Smart Irrigation"
                    description="You can irrigate your crops anywhere you're!"
                    onPressNext={goToNextPage}
                    onPressBack={goToPreviousPage}
                    active={2}
                />
            </View>
            <View key={3}>
                <Slide
                    imageSource={require('../../assets/images/dashboard/sensorReminder.png')}
                    title="Sensor Reminder"
                    description="You can irrigate your crops anywhere you're!"
                    onPressBack={goToPreviousPage}
                    active={3}
                />
            </View>
        </PagerView>
    )
}

export default PagerViewComponent