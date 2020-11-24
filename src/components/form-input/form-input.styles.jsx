import styled from 'styled-components';


export const InputField = styled.input`
background: none;
background-color: white;
color: black;
font-size: 18px;
padding: 10px 10px 10px 5px;
display: block;
width: 100%;
border: none;
border-radius: 0;
border-bottom: 1px solid black;
margin: 25px 0;
position:relative;

&:focus {
  outline: none;
  background-color: #ddd;
}


`;

export const Group = styled.div`
position: relative;
margin: 45px 0;
`;


export const InputLabel = styled.label`
color: #444;
font-size: 16px;
font-weight: normal;
position: absolute;
pointer-events: none;
left: 5px;
top: 10px;
transition: 300ms ease all;

&.shrink {
  top: -14px;
  font-size: 12px;
  color: $main-color;
  

}


${InputField}:focus ~ & {
  top: -14px;
  font-size: 12px;
  color: $main-color;
}


`;





