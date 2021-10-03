import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {VictoryPie} from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import {useTheme} from 'styled-components';
import {HistoryCard} from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import {Container, Header, Title, Content,ChartContainer} from './styles'


interface ITransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface ICategoryData{
  key: string;
  name: string;
  total:number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume(){

  const theme = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>([]);

  async function loadData(){
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    // filtrar as transações de saida
    const expensives = responseFormatted
    .filter((expensive: ITransactionData) => expensive.type === 'negative');

    // calcular a porcentagem total
    const expensivesTotal = expensives.reduce((acumullator: number, expensive: ITransactionData) => {
      return acumullator + Number(expensive.amount);
    }, 0);

    

    const totalByCategories: ICategoryData[] = [];

    // pegar as minhas categorias
    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: ITransactionData) => {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }

      });


      if(categorySum > 0){

        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency:'BRL'
        });

        const percent = `${(categorySum/ expensivesTotal * 100).toFixed(0)}%`;

        totalByCategories.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        });

      }
    })

    setTotalByCategories(totalByCategories);

  }

  console.log

  useEffect(() => {
    loadData();
  }, []);

  return(
    <Container>
      <Header>
          <Title>Resumo por categoria</Title>
        </Header>

        <Content>
          <ChartContainer>
            <VictoryPie 
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels:{
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill:theme.colors.shape
                }
              }}
              labelRadius={50} // faz com que o minha porcentagem fique dentro do gráfico
              x="percent" 
              y="total"
            />
          </ChartContainer>
       
          {totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name} 
              amount={item.totalFormatted} 
              color={item.color}
            />
            
            ))
          
          }
        </Content>
       

       
    </Container>
  )
}