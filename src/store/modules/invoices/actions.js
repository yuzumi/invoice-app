import { firestore } from '@/firebase';

export default {
  getInvoices: async ({ commit, state }) => {
    commit('setLoading', true);

    const documents = await firestore.collection('invoices').get();

    documents.forEach((document) => {
      if (!state.invoices.some((invoice) => invoice.docId === document.id)) {
        const data = {
          docId: document.id,
          ...document.data(),
        };

        commit('addInvoice', data);
      }
    });

    commit('setLoading', false);
  },
};
