import React, { useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';
import { View } from 'react-native';
import { Board1, Board2, Board3 } from '@/components/onBoarding/Boards';

const OnBoarding = () => {
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
    <View style={{ flex: 1 }}>
      <PagerView style={{ flex: 1 }} initialPage={0} ref={pageRef}>
        <View key={1}>
          <Board1 next={goToNextPage} />
        </View>
        <View key={2}>
          <Board2 next={goToNextPage} back={goToPreviousPage} />
        </View>
        <View key={3}>
          <Board3 back={goToPreviousPage} />
        </View>
      </PagerView>
    </View>
  );
};

export default OnBoarding;