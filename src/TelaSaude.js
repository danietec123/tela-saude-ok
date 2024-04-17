import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const TelaSaude = () => {
  const navigation = useNavigation(); /* usenavigation navegar entre as telas do aplicativo, primero instalar o pacote.*/

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); /*visibilidade do seletor de data.*/
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState(null); /*armazenar o item selecionado no primeiro dropdown.*/
  const [open1, setOpen1] = useState(false); /*primeiro dropdown está aberto ou fechado.*/
  const [selectedItem2, setSelectedItem2] = useState(null); /*comentario acima*/
  const [open2, setOpen2] = useState(false); /*comentario acima*/
  const [temperature, setTemperature] = useState(''); /* armazenar a temperatura inserida pelo usuário.*/

  const handleConfirm = (date) => { /*funcao que confirma  uma data no botao de data e hora*/
    setSelectedDate(date); /*apos selecionar a data ela é confirmada no handleConfirm = (date)*/
    setDatePickerVisibility(false); /*oculta o seletor de data e hora após a selecinar*/
  };

  const handleAdicionar = () => { /*quando clicar na botao adicionar*/
    
    navigation.navigate('Perfil');
  };
/*opçoes ao aperta o botao por favor, selecione*/
  const optionsForConsulta = [
    { label: 'Pediatra', value: 'Pediatra' },
    { label: 'Emergência', value: 'Emergência' },
    { label: 'Dentista', value: 'Dentista' },
    { label: 'Neurologista', value: 'Neurologista' },
    { label: 'Ortopedista', value: 'Ortopedista' }
  ];

  const optionsForVacina = [
    { label: 'BCG - ID', value: 'BCG - ID' },
    { label: 'HEPATITE B 1', value: 'HEPATITE B 1' },
    { label: 'HEPATITE B', value: 'HEPATITE B' },
    { label: 'TETRAVALENTE (DTP + HIB)', value: 'TETRAVALENTE (DTP + HIB)' },
    { label: 'VOP (CONTRA PÓLIO)', value: 'VOP (CONTRA PÓLIO)' },
    { label: 'VORH (ROTAVÍRUS HUMANO)', value: 'VORH (ROTAVÍRUS HUMANO)' }
  ];

  const optionsForMedicamento = [
    { label: 'Analgésico', value: 'Analgésico' },
    { label: 'Anti inflamatório', value: 'Anti inflamatório' },
    { label: 'Antibiótico', value: 'Antibiótico' },
    { label: 'Vitaminas', value: 'Vitaminas' },
    { label: 'Antitérmico', value: 'Antitérmico' }
  ];

  return (
    <View style={styles.container}>
      {/* Ícone de voltar */}
      <Icon name="arrow-left" size={20} color="#000" onPress={() => navigation.goBack()} style={styles.iconBack} />

      {/* Título da tela */}
      <Text style={styles.titulo}>Saúde</Text>  
      <Image
          source={require('../assets/img/bebe.png')}
          style={{ width: 60, height: 55 }} //  largura e altura do imagem do icon
        />
            {/* Primeiro BOTAO SELECIONE */}
      <DropDownPicker /*seria o pacote */
        items={[
          { label: 'Vacina', value: 'vacina' },
          { label: 'Consulta', value: 'consulta' },
          { label: 'Medicamento', value: 'medicamento' },
          { label: 'Temperatura', value: 'temperatura' }
        ]}
        defaultValue={null}  /*ainda não foi selecionado nenhum item, por isso o null*/
        placeholder="Selecione" /*titulo do botao*/
        containerStyle={styles.dropdownContainer} // Adicionando margem inferior
        style={styles.dropdown} /*estilo do botao, cor de fundo ou borda*/
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdownMenu} /*estilo do botao, cor de fundo ou borda*/
        open={open1}
        setOpen={setOpen1} /* atualizar o estado de abertura do botao*/
        value={selectedItem1} // Valor selecionado no seletor
        setValue={setSelectedItem1} // Função para atualizar o valor selecionado, por exemplo vacina
        zIndex={2000}
        zIndexInverse={2000} /*sobreposição dos botoes*/
      />

      <DropDownPicker
        items={
          selectedItem1 === 'consulta' ? optionsForConsulta : 
          selectedItem1 === 'vacina' ? optionsForVacina :
          selectedItem1 === 'medicamento' ? optionsForMedicamento :
          []
          /*Se selectedItem1 for igual a 'consulta, vacina, ou medicamento', o botao exibirá os itens contidos em optionsForConsulta,vacina,medicamento
          por exemplo em selectedItem1 === 'consulta' ? optionsForConsulta : vamos ter a opção de pediatra, dentista... */
        }
        defaultValue={null}
        placeholder="Por favor, escolha"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdownMenu}
        open={open2}
        setOpen={setOpen2}
        value={selectedItem2}
        setValue={setSelectedItem2}
        zIndex={1000}
        zIndexInverse={3000}
        /*comentarios acima*/
      />

      {selectedItem1 === 'temperatura' && /*verica se pertence a temperatura, o selected verifica, apos verificar vai aparecer a opção do text input*/
        <TextInput
          style={styles.input} /*css*/
          placeholder="Insira a temperatura" /*titulo */
          keyboardType="numeric" /*inserir a temperatura em numeros*/
          value={temperature}
          onChangeText={setTemperature}
        />
      }

     {/* Botão para selecionar data e hora */}
      <Button
        title="Data e Hora"
        color='#90ee90'
        onPress={() => setDatePickerVisibility(true)}
      />
       {/* Modal de seleção de data e hora */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible} /*visibilidade do modal DATA E HORA, */
        mode="datetime" /*seletor como data e hora*/
        onConfirm={handleConfirm} /*aqui quando eu selecionar a data e hora */
        onCancel={() => setDatePickerVisibility(false)} /*false para quando eu cancelar o botao*/
      />

        {/* Exibição da data selecionada */}
      {selectedDate && 
      /*funcao para verificar se é verdadeiro ou false, 
      verdadeiro vai aparecer a data e hora, executando a dat /hora*/
        <Text>{format(selectedDate, 'dd/MM, HH:mm')}</Text>
        /*formata como vai aparecer data/hora aqui faz parte tambem do 
        pacote import { format } from 'date-fns';*/
      }

      <View style={styles.buttonContainer}>
        <Button /*BOTAO ADICIONAR*/
          title="Adicionar" /*TITULO*/
          color='#30cfa9' /*COR*/
          onPress={handleAdicionar} /*AO PRESSIONAR O BOTAO , ADICIONA AS OPÇOES QUE SELECIONEI*/
        />
      </View>
    </View>
  );
};


/*CSS*/
const styles = StyleSheet.create({ /*itens no geral*/
  container: {
    flex: 1,
    backgroundColor:'white',
    padding:16,
    justifyContent: 'center',
    alignItems: 'center', // Centraliza horizontalmente todos os itens 
    
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Margem inferior do título
    marginTop: -220, // Margem superior do título, ajustada para alinhar com a borda superior
},
icone: {
    marginBottom: 20, // Margem inferior do ícone
},
dropdownContainer: {
    width: '80%',
    marginBottom: 20,
},
dropdown: { /*estilo dos botoes 1 e 2*/
    height:50,
    borderColor:'gray',
    backgroundColor: '#90ee90',
    borderWidth:0.5,
    borderRadius:8,
    paddingHorizontal: 8,
},
dropdownItem: {
    justifyContent: 'flex-start', //  itens do BOTAO à esquerda
    paddingHorizontal: 10, // horizontal dos itens do BOTAO
},
dropdownMenu: {
    marginTop: 2, // 
},
input: { /*botao de temperatura*/
  height: 40,
  width: '80%',
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 20,
  paddingHorizontal: 10,
},

buttonContainer: { /*botao adicionar*/
  width: '80%',
  marginBottom: 20, // Ajuste a margem inferior conforme necessário
  marginTop: 100, // Mover o botão "Adicionar" um pouco para cima
  borderRadius: 5,
  overflow: 'hidden',
  backgroundColor: '#30cfa9',
},
iconBack: { // ícone de voltar
  position: 'absolute', // Posicionamento absoluto
  top: 16, // Distância do topo
  left: 16, // Distância da esquerda
},
});

export default TelaSaude;
