import { createContext, useContext, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Subscribe once, at the provider level
  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTodos(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const addTodo = useCallback(async (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    await addDoc(collection(db, "todos"), {
      title: trimmed,
      completed: false,
      createdAt: serverTimestamp(),
    });
  }, []);

  const toggleTodo = useCallback(async (id, current) => {
    await updateDoc(doc(db, "todos", id), { completed: !current });
  }, []);

  const deleteTodo = useCallback(async (id) => {
    await deleteDoc(doc(db, "todos", id));
  }, []);

  const value = useMemo(
    () => ({
      todos,
      loading,
      addTodo,
      toggleTodo,
      deleteTodo,
    }),
    [todos, loading, addTodo, toggleTodo, deleteTodo]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};
