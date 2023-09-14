export interface JudgmentXML {
  name?: string;
  address?: string;
  dob?: string;
  courtname: string;
  courttype: number;
  casenumber: string;
  status: string;
  amount: number;
  judgmentdate?: string;
  datesatisfied?: string;
  notice?: string; // this is a datastructure, see p120, p124
}

export interface Judgment {
  name?: string;
  address?: string;
  dob?: string;
  courtName: string;
  courtType: number;
  caseNumber: string;
  status: string;
  amount: number;
  judgmentDate?: string;
  dateSatisfied?: string;
}
