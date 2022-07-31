const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  //번들링 하기 위한 시작점이 되는 파일
  entry: `${path.resolve(__dirname, './src')}/index.tsx`,
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], //module import시 확장자 안붙여도 가능하도록 해주는 옵션
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  //loader - 웹팩이 웹 애플리케이션을 해석할 때 순수 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와주는 속성
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          publicPath: '/',
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  plugins: [
    // public/index.html을 기본 템플릿 삼아 빌드시 빌드된 자바스크립트 파일이 삽입된 html 자동생성
    new HtmlWebpackPlugin({
      template: `${path.resolve(__dirname, './public')}/index.html`,
      inject: 'body',
    }),
    //각 모듈마다 import React from 'react'자동 삽입
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],

  /* 
  output: entry로 시작된 파일이 loader를 거쳐 하나의 번들링된 파일로 생성
  publicPath: devServer실행시 router와 같은 역할을 함 
  즉 publicPath로 설정된 경로 ex) http://localhost.com:3000/${publicPath}
  로 접근 해야 비로소 화면이 보여진다 
  */
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
    clean: true,
  },
  stats: {
    children: true,
  },
  devServer: {
    open: true, // devServer 실행시 자동으로 브라우저 실행하여 화면 출력
    hot: true, // 기본적으로 전체 리로드 되지만 react와 같은 spa의 경우 전체 리로드 될 경우 데이터가 사라지는 문제 발생 따라서 모듈별로 리로드
    compress: true, // 압축
    port: 3000,
    historyApiFallback: true, //라우터 이동시 (Link) 새로고침을 하게되면 브라우저상에 적혀있는 url주소는 실제 서버 주소가 아님에도 불구하고 리로드 되게 할 수 있는 기능
    liveReload: true,
  },
};
