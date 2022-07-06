const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: `${path.resolve(__dirname, './src')}/index.tsx`,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], //module import시 확장자 안붙여도 가능하도록 해주는 옵션
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  //loader - 순수 자바스크립트 파일이 아닌 자원들(ex.html, css, images, jsx, tsx)을 변환 할 수 있도록 도와주는 속성들
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // public/index.html을 기본 템플릿 삼아 빌드시 빌드된 자바스크립트 코드가 삽입된 html 생성
    new HtmlWebpackPlugin({
      template: `${path.resolve(__dirname, './public')}/index.html`,
      inject: 'body',
    }),
    //각 모듈마다 import React from 'react'주입 
    //컴포넌트 모듈 마다 안적어 줘도 됨
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],

  /* 
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
