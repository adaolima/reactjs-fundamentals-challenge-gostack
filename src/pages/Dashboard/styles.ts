import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
  @media (max-width: 992px) {
    padding: 40px 0px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -120px;
  overflow-x: auto;
  width: 100%;
  height: 200px;
`;

export const Card = styled.div`
  background: ${({ total }: CardProps): string => (total ? '#FF872C' : '#fff')};
  padding: 22px 32px;
  border-radius: 5px;
  color: ${({ total }: CardProps): string => (total ? '#fff' : '#363F5F')};
  display: flex;
  min-width: 300px;
  flex-direction: column;

  &:first-child {
    @media (max-width: 992px) {
      margin-left: 20px;
    }
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    flex: 1;
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
    display: flex;
    align-items: flex-end;
  }
  span {
    color: #969cb2;
    font-weight: 400;
    font-size: 12px;
    &.legend-balance {
      color: #fff;
    }
  }
`;

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;
    @media (max-width: 992px) {
      padding: 0px 20px;
    }

    thead {
      display: table-caption;
      @media (max-width: 992px) {
        display: none;
      }
      tr {
        display: flex;
      }
    }

    th {
      flex: 1;
      display: flex;
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
      cursor: pointer;
      span {
        margin-right: 15px;
      }
      img {
        transform-origin: center;
        transition: rotate ease 0.5s;
        transform: rotate(0deg);
      }
      &.active img {
        transform: rotate(180deg);
      }
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
    @media (max-width: 992px) {
      tr {
        border-radius: 8px;
        width: 100%;
        height: 128px;
        display: grid;
        overflow: hidden;
        padding: 15px 25px;
        background-color: #fff;
        td {
          padding: 0px;
        }
        td:first-child,
        td:last-child {
          border-radius: 0px;
        }
        grid-template-areas:
          'title title'
          'price price'
          'category date';
        grid-template-rows: 24px 45px auto;
        grid-template-columns: 1fr 1fr;
        td:nth-child(1) {
          grid-area: title;
          font-size: 14px;
          line-height: 24px;
        }
        td:nth-child(2) {
          grid-area: price;
          font-size: 20px;
          line-height: 32px;
        }
        td:nth-child(3) {
          grid-area: category;
          font-size: 14px;
        }
        td:nth-child(4) {
          grid-area: date;
          font-size: 14px;
          text-align: right;
        }
        margin-bottom: 20px;
      }
    }
  }
`;
