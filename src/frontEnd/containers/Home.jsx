import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';

const Home = ({ myList, trends, originals }) => {
	return (
		<>
			<Search isHome></Search>
			{myList.length > 0 && (
				<Categories title='Mi lista'>
					<Carousel>
						{myList.map(video => (
							<CarouselItem key={video.id} {...video} isList />
						))}
					</Carousel>
				</Categories>
			)}
			{trends.length > 0 && (
				<Categories title='Tendencias'>
					<Carousel>
						{trends.map(video => (
							<CarouselItem key={video.id} {...video}></CarouselItem>
						))}
					</Carousel>
				</Categories>
			)}
			{originals.length > 0 && (
				<Categories title='Originales de Platzi Video'>
					<Carousel>
						{originals.map(video => (
							<CarouselItem key={video.id} {...video}></CarouselItem>
						))}{' '}
					</Carousel>
				</Categories>
			)}
		</>
	);
};

const mapStateToProps = state => {
	return {
		myList: state.myList,
		trends: state.trends,
		originals: state.originals,
	};
};

export default connect(
	mapStateToProps,
	null
)(Home);
