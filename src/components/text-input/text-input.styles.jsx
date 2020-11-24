import styled from 'styled-components';


export const TextInputField = styled.textarea`
background: none;
background-color: white;
color: black;
font-size: 18px;
padding: 0px;
display: block;
width: 100%;
min-height: 200px;
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


export const TextInputLabel = styled.label`
color: #444;
font-size: 16px;
font-weight: normal;
position: absolute;
pointer-events: none;
left: 5px;
top: 10px;
transition: 300ms ease all;

&.shrink {
  top: -24px;
  font-size: 12px;
  color: $main-color;
  

}


${TextInputField}:focus ~ & {
  top: -14px;
  font-size: 12px;
  color: $main-color;
}


`;





