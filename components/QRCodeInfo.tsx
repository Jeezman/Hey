import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';
import QRCode from "react-qr-code";
import { LNContext } from '../context/LNContext';
import { useContext } from 'react';

function QRCodeInfo({}) {
  const {paymentRequest} = useContext(LNContext);

  const generateQRCode = (canvas) => {
    if (canvas !== null) {
      // QRCode options
      var options = {
        text: 'lnbcrt40u1p390rcepp53xkl5j6jt9393ks479v9sa64zc0st0658mvjp3dk32z3xvdxky3sdp6dp68gurn8ghj7mt9v46zuem0dankcefwvdhk6tmxd96z67nzw93j6erjwvcqzpgxqrrsssp5t20thhks2uat0rd0vgvxnhwlpjut6malg3l85mmsw0vqrhfqn05q9qyyssq84ggan2fr6funhksma0dg52px77zknqmr6nq2d0cdv4lzf832ewzehhymx3c33k2ul3qp4hzkjn0emyd8gwllwtqhv8x20059cum99sp0rcg26',
      };
      // Create QRCode Object
      var qrCode = new QRCode(canvas, options);
    }
  };
  return (
    <View>
      {/* <Canvas ref={generateQRCode} /> */}
      {Boolean(paymentRequest) && <QRCode value={paymentRequest} />}
      <Text>{paymentRequest}</Text>
      
    </View>
  );
}

export { QRCodeInfo };
