import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as yup from 'yup'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Formik } from 'formik'

const passwordschema = yup.object().shape({
  passwordlenght: yup.number().min(4,'enter minimum 4').max(16,'16 is maximum limit').required('required')
})

export default function App() {
  const [ password , setpassword ] = useState('')
  const [ ispasswordgenerated , setispasswordgenerated ] = useState(false)
  const [ lowercase , setlowercase ] = useState(true)
  const [ uppercase , setuppercase ] = useState(false)
  const [ numbers , setnumbers ] = useState(false)
  const [ symbols , setsymbols ] = useState(false)

  const generatePasswordString = ( passwordlenght: number ) => {
    let characterList='';

    const uppercaseChar='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChar='abcdefghijklmnopqrstuvwxyz';
    const numbersChar='0123456789';
    const symbolsChar='~!@#$%^&*()_+';

    if(uppercase){
      characterList+=uppercaseChar
    }
    if(lowercase){
      characterList+=lowercaseChar
    }
    if(numbers){
      characterList+=numbersChar
    }
    if(symbols){
      characterList+=symbolsChar
    }

    const passwordResult = createPassword(characterList,passwordlenght)

    setpassword(passwordResult ?? '')
    setispasswordgenerated(true)
  }

  const createPassword = ( characters : string , passwordlenght: number) => {
    let result = ''
    for (let i = 0; i < passwordlenght; i++) {
      const characterIndex = Math.round(Math.random()* characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }

  const resetPassword = () => {
    setpassword('')
    setispasswordgenerated(false)
    setuppercase(false)
    setlowercase(true)
    setnumbers(false)
    setsymbols(false)
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <Text style={styles.heading}>Password Generator</Text>
          <Formik
       initialValues={{ passwordlenght:'' }}
       validationSchema={passwordschema}
       onReset={resetPassword}
       onSubmit={values => {
        generatePasswordString(+values.passwordlenght) // '+' is to convert values.passwordlength into numbers as passlength will only take numbers//
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleReset,
         handleSubmit,
         resetForm
         /* and other goodies */
       }) => (
        <>
        <View style={styles.Inputcontainer}>
          <View style={styles.Insidecontainer}>
                  <Text style={styles.title}>Password Lenght :</Text>
                  {touched.passwordlenght && errors.passwordlenght && <Text style={styles.errorText}>{errors.passwordlenght}</Text>}
          </View>
          <TextInput
           style={styles.Inputtext}
           value={values.passwordlenght}
           onChangeText={handleChange('passwordlenght')}
           placeholder='ex-5'
           keyboardType='numeric'
          />
        </View>

        <View style={styles.Inputcontainer}>
          <Text style={styles.title}>Include Lowercase</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={lowercase}
          onPress={() => {setlowercase(!lowercase)}}
          fillColor='#76FF03'
          />
        </View>

        <View style={styles.Inputcontainer}>
          <Text style={styles.title}>Include Uppercase</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={uppercase}
          onPress={() => {setuppercase(!uppercase)}}
          fillColor='#76FF03'
          />
        </View>

        <View style={styles.Inputcontainer}>
          <Text style={styles.title}>Include Numbers</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={numbers}
          onPress={() => {setnumbers(!numbers)}}
          fillColor='#76FF03'
          />
        </View>

        <View style={styles.Inputcontainer}>
          <Text style={styles.title}>Include Symbols</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={symbols}
          onPress={() => {setsymbols(!symbols)}}
          fillColor='#76FF03'
          />
        </View>

        <View style={styles.actionBtn}>
          <TouchableOpacity 
          style={styles.primaryBtn}
          disabled={!isValid}
          onPress={handleSubmit}
          >
           <Text style={styles.Btntext}>Generate Password 🔑</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBn}
          disabled={!isValid}
          onPress={resetForm}
          >
            <Text style={styles.Btntext}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        </>
       )}
     </Formik>
        </View>
        {ispasswordgenerated ? (
          <View style={[styles.Resultcard , styles.cardelevated]}>
            <Text style={styles.title}>Genrerated Password :</Text>
            <Text style={styles.subtitle}>Long press to Copy</Text>
            <Text selectable style={styles.password}>{password}</Text>
          </View>
         ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  heading:{
    fontSize:24,
    fontWeight:'bold',
    padding:8
  },
  Inputcontainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    padding:16,
    alignItems:'center'
  },
  Insidecontainer:{
    flex:1,
    flexDirection:'column',
  },
  title:{
    fontSize:20,
    fontWeight:'600'
  },
  errorText:{
    fontSize:12,
    fontWeight:'300',
    color:'#D50000'
  },
  Inputtext:{
    fontSize:16,
    fontWeight:'600'
  },
  actionBtn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  primaryBtn:{
    height:60,
    width:160,
    backgroundColor:'#76FF03',
    borderRadius:24,
    padding:16
  },
  Btntext:{
    textAlign:'center',
    fontWeight:'bold',
    color:'#000'
  },
  secondaryBn:{
    height:60,
    width:160,
    backgroundColor:'#76FF03',
    borderRadius:24,
    padding:16
  },
  Resultcard:{
    alignSelf:'center',
    justifyContent:'space-evenly',
    height:150,
    width:300,
    borderRadius:24,
    margin:32,
    padding:8
  },
  cardelevated:{
    backgroundColor:'#2196F3'
  },
  subtitle:{
    fontSize:16,
  },
  password:{
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  }

})