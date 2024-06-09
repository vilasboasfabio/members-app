import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
    backgroundColor: "#04233f",
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#04233f",
  },
  container: {
    padding: 32,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 20,
    textAlign: 'center',
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
  
  userName: {
    fontSize: 18, 
    fontWeight: 'bold', 
  },
  userDetail: {
    fontSize: 14, 
  },
  errorText: {
    color: '#f56565'
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F5E5AC',
    marginBottom: 22,
    textAlign: 'center',
  },
  fundoinputs: {
    backgroundColor:'#e2e8f0',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#04233f',
    shadowOffset: { width: 100, height: 10 },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
  },
  button: {
    backgroundColor: '#D9D9D9',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#04233f',
    shadowOffset: { width: 100, height: 10 },
    shadowOpacity: 10,
    shadowRadius: 10,
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
   successMessage: {
    color: '#68d391',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});