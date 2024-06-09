import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
    backgroundColor: '#31394C',
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31394C',
  },
  container: {
    marginTop: 40,
    backgroundColor: '#31394C',
    padding: 32,
    borderRadius: 8,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  message: {
    marginBottom: 16,
    textAlign: 'center',
    color: '#f56565', 
  },
  inputGroup: {
    marginBottom: 16, 
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    color: '#4a5568',
    fontSize: 16, 
  },
  buttonGroup: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  userCard: {
    padding: 16, 
    borderRadius: 8, 
    marginTop: 16, 
    backgroundColor: '#e2e8f0', 
  },
  userName: {
    fontSize: 18, 
    fontWeight: 'bold', 
  },
  userDetail: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#f56565'
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F5E5AC',
    marginBottom: 16,
    textAlign: 'justify',
  },
  fundoinputs: {
    backgroundColor:'#e2e8f0',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
  },
  button: {
    backgroundColor: '#D9D9D9',
    padding: 12,
    borderRadius: 10,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
    textAlign: 'center',
    marginTop: 20,
  },
  textbutton: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});