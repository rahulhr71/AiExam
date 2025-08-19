import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutDashboard,
  Users,
  NotebookText,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  CalendarClock,
  BookOpenCheck,
  FileDown,
  MessageSquarePlus,
  Search,
} from "lucide-react";

// ---- shadcn/ui components ----
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// -------------------------------------------------------------
// Helper utilities
// -------------------------------------------------------------
const classNames = (...arr) => arr.filter(Boolean).join(" ");

function exportCSV(filename, rows) {
  if (!rows?.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// -------------------------------------------------------------
// Mock data (replace with API calls later)
// -------------------------------------------------------------
const mockStudents = [
  { id: "S-1001", name: "Riya Sharma", email: "riya@school.edu", class: "10-A", roll: 1 },
  { id: "S-1002", name: "Arjun Mehta", email: "arjun@school.edu", class: "10-A", roll: 2 },
  { id: "S-1003", name: "Simran Kaur", email: "simran@school.edu", class: "10-B", roll: 5 },
  { id: "S-1004", name: "Kabir Khan", email: "kabir@school.edu", class: "10-B", roll: 3 },
];

const mockExams = [
  {
    id: "E-2001",
    title: "Maths Unit Test",
    type: "MCQ",
    startTime: "2025-08-20 10:00",
    endTime: "2025-08-20 10:45",
    status: "Scheduled",
    assignedTo: ["10-A", "10-B"],
    createdBy: "Teacher-01",
  },
  {
    id: "E-2002",
    title: "English Essay",
    type: "Subjective",
    startTime: "2025-08-22 11:00",
    endTime: "2025-08-22 12:00",
    status: "Draft",
    assignedTo: ["10-A"],
    createdBy: "Teacher-01",
  },
];

const mockResults = [
  { id: 1, examId: "E-2001", student: "Riya Sharma", score: 38, total: 50, percentage: 76, grade: "B+" },
  { id: 2, examId: "E-2001", student: "Arjun Mehta", score: 42, total: 50, percentage: 84, grade: "A" },
  { id: 3, examId: "E-2001", student: "Simran Kaur", score: 46, total: 50, percentage: 92, grade: "A+" },
  { id: 4, examId: "E-2001", student: "Kabir Khan", score: 29, total: 50, percentage: 58, grade: "C" },
];

const mockAnnouncements = [
  { id: 1, title: "Unit Test rescheduled", body: "Maths Unit Test moved to 20 Aug 10 AM.", date: "2025-08-16" },
  { id: 2, title: "Project submission", body: "English project due by Friday.", date: "2025-08-18" },
];

// -------------------------------------------------------------
// Layout
// -------------------------------------------------------------
const NavItem = ({ active, icon: Icon, label, onClick }) => (
  <button
    className={classNames(
      "flex w-full items-center gap-3 rounded-xl px-4 py-2 text-left transition",
      active ? "bg-primary/10 text-primary" : "hover:bg-muted"
    )}
    onClick={onClick}
  >
    <Icon size={18} />
    <span className="font-medium">{label}</span>
  </button>
);

const TopBar = ({ onSearch }) => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 p-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <Search size={18} className="opacity-70" />
        <Input placeholder="Search students, exams…" className="w-64" onChange={(e)=>onSearch?.(e.target.value)} />
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" title="Notifications"><Bell size={18} /></Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full">RK</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Teacher</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600"><LogOut size={16} className="mr-2"/>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Pages
// -------------------------------------------------------------
function DashboardHome({ students, exams, results }) {
  const avgScore = useMemo(() => {
    const arr = results.map((r) => r.percentage);
    if (!arr.length) return 0;
    return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  }, [results]);

  const lineData = useMemo(() =>
    [
      { name: "Mon", tests: 2, avg: 72 },
      { name: "Tue", tests: 1, avg: 81 },
      { name: "Wed", tests: 0, avg: 0 },
      { name: "Thu", tests: 1, avg: 76 },
      { name: "Fri", tests: 3, avg: 84 },
      { name: "Sat", tests: 1, avg: 78 },
    ],
  []);

  const pieData = [
    { name: "A+", value: results.filter(r=>r.grade==="A+").length },
    { name: "A", value: results.filter(r=>r.grade==="A").length },
    { name: "B+", value: results.filter(r=>r.grade==="B+").length },
    { name: "C", value: results.filter(r=>r.grade==="C").length },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
            <CardDescription>Active in your classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{exams.filter(e=>e.status!=="Completed").length}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Average Score</CardTitle>
            <CardDescription>Latest exam</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgScore}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Tests conducted and average %</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tests" />
                <Line type="monotone" dataKey="avg" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Last exam</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} label />
                {pieData.map((_, i) => (
                  <Cell key={i} />
                ))}
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
          <CardDescription>Keep your class informed</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.title}</TableCell>
                  <TableCell><Badge variant="outline">{e.type}</Badge></TableCell>
                  <TableCell className="text-sm opacity-80">{e.startTime} → {e.endTime}</TableCell>
                  <TableCell>
                    <Badge className={classNames(
                      e.status === "Scheduled" && "bg-blue-600",
                      e.status === "Draft" && "bg-gray-600",
                      e.status === "Completed" && "bg-emerald-600",
                    )}>{e.status}</Badge>
                  </TableCell>
                  <TableCell>{e.assignedTo.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StudentsPage({ students, onAdd, onUpdate, onDelete, query }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", class: "10-A", roll: "" });
  const filtered = useMemo(() => {
    if (!query) return students;
    const q = query.toLowerCase();
    return students.filter(
      (s) => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.class.toLowerCase().includes(q)
    );
  }, [students, query]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Students</h2>
          <p className="text-sm opacity-70">Manage enrollment, profiles, and class allocations.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-2xl"><Plus className="mr-2" size={16}/>Add Student</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[520px]">
            <DialogHeader>
              <DialogTitle>Add new student</DialogTitle>
              <DialogDescription>Fill the basic information below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <Input placeholder="Full name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
              <Input placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Class (e.g. 10-A)" value={form.class} onChange={(e)=>setForm({...form, class:e.target.value})} />
                <Input placeholder="Roll" value={form.roll} onChange={(e)=>setForm({...form, roll:e.target.value})} />
              </div>
              <Button onClick={()=>{ onAdd?.(form); setOpen(false); setForm({ name:"", email:"", class:"10-A", roll:""}); }}>
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Roll</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-sm">{s.email}</TableCell>
                  <TableCell>{s.class}</TableCell>
                  <TableCell>{s.roll}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" title="Edit" onClick={()=>onUpdate?.(s.id)}><Pencil size={16}/></Button>
                      <Button variant="destructive" size="icon" title="Delete" onClick={()=>onDelete?.(s.id)}><Trash2 size={16}/></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ExamsPage({ exams, onCreate, onPublish, onDelete, query }) {
  const [open, setOpen] = useState(false);
  const [qForm, setQForm] = useState({
    title: "",
    type: "MCQ",
    startTime: "",
    endTime: "",
    assignedTo: "10-A,10-B",
    questions: [
      { questionText: "2 + 2 = ?", type: "MCQ", options: ["3", "4", "5", "6"], correctAnswer: "4" },
    ],
  });

  const filtered = useMemo(() => {
    if (!query) return exams;
    const q = query.toLowerCase();
    return exams.filter((e) => e.title.toLowerCase().includes(q) || e.type.toLowerCase().includes(q) || e.status.toLowerCase().includes(q));
  }, [exams, query]);

  const addBlankQuestion = () => {
    setQForm((f) => ({
      ...f,
      questions: [
        ...f.questions,
        { questionText: "", type: f.type, options: ["", "", "", ""], correctAnswer: "" },
      ],
    }));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Exams</h2>
          <p className="text-sm opacity-70">Create, schedule, and manage assessments.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-2xl"><CalendarClock className="mr-2" size={16}/>Create Exam</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New Exam</DialogTitle>
              <DialogDescription>Define the schedule and questions.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Title" value={qForm.title} onChange={(e)=>setQForm({...qForm, title:e.target.value})} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="justify-between">{qForm.type}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {[
                      {label:"MCQ", value:"MCQ"},
                      {label:"Subjective", value:"Subjective"},
                    ].map((i)=>(
                      <DropdownMenuItem key={i.value} onClick={()=>setQForm({...qForm, type:i.value})}>{i.label}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Start (YYYY-MM-DD HH:mm)" value={qForm.startTime} onChange={(e)=>setQForm({...qForm, startTime:e.target.value})} />
                <Input placeholder="End (YYYY-MM-DD HH:mm)" value={qForm.endTime} onChange={(e)=>setQForm({...qForm, endTime:e.target.value})} />
              </div>
              <Input placeholder="Assigned Classes (comma separated)" value={qForm.assignedTo} onChange={(e)=>setQForm({...qForm, assignedTo:e.target.value})} />

              <div className="rounded-xl border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium">Questions</h4>
                  <Button size="sm" variant="outline" onClick={addBlankQuestion}><Plus size={14} className="mr-1"/>Add</Button>
                </div>
                <div className="grid gap-4">
                  {qForm.questions.map((q, idx) => (
                    <Card key={idx} className="rounded-xl">
                      <CardHeader>
                        <CardTitle className="text-base">Q{idx + 1}</CardTitle>
                        <CardDescription>{q.type}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Textarea placeholder="Question text" value={q.questionText} onChange={(e)=>{
                          const newQs = [...qForm.questions];
                          newQs[idx].questionText = e.target.value;
                          setQForm({...qForm, questions:newQs});
                        }}/>
                        {qForm.type === "MCQ" && (
                          <div className="grid grid-cols-2 gap-2">
                            {q.options.map((op, i) => (
                              <Input key={i} placeholder={`Option ${i+1}`} value={op} onChange={(e)=>{
                                const newQs = [...qForm.questions];
                                newQs[idx].options[i] = e.target.value;
                                setQForm({...qForm, questions:newQs});
                              }} />
                            ))}
                            <Input className="col-span-2" placeholder="Correct Answer" value={q.correctAnswer} onChange={(e)=>{
                              const newQs = [...qForm.questions];
                              newQs[idx].correctAnswer = e.target.value;
                              setQForm({...qForm, questions:newQs});
                            }} />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
                <Button onClick={()=>{ onCreate?.(qForm); setOpen(false); }}>Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.title}</TableCell>
                  <TableCell><Badge variant="outline">{e.type}</Badge></TableCell>
                  <TableCell className="text-sm opacity-80">{e.startTime} → {e.endTime}</TableCell>
                  <TableCell>
                    <Badge className={classNames(
                      e.status === "Scheduled" && "bg-blue-600",
                      e.status === "Draft" && "bg-gray-600",
                      e.status === "Completed" && "bg-emerald-600",
                    )}>{e.status}</Badge>
                  </TableCell>
                  <TableCell>{e.assignedTo.join(", ")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" title="Publish" onClick={()=>onPublish?.(e.id)}><BookOpenCheck size={16}/></Button>
                      <Button variant="destructive" size="icon" title="Delete" onClick={()=>onDelete?.(e.id)}><Trash2 size={16}/></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ResultsPage({ results, exams }) {
  const [selected, setSelected] = useState("all");
  const filtered = useMemo(() => (selected === "all" ? results : results.filter(r=>r.examId===selected)), [results, selected]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Results</h2>
          <p className="text-sm opacity-70">Analyze and export student performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-2xl">
                {selected === "all" ? "All Exams" : exams.find(e=>e.id===selected)?.title}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=>setSelected("all")}>All Exams</DropdownMenuItem>
              <DropdownMenuSeparator />
              {exams.map((e)=> (
                <DropdownMenuItem key={e.id} onClick={()=>setSelected(e.id)}>{e.title}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={()=>exportCSV("results.csv", filtered)} className="rounded-2xl"><FileDown size={16} className="mr-2"/>Export CSV</Button>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r)=> (
                <TableRow key={r.id}>
                  <TableCell>{r.student}</TableCell>
                  <TableCell className="text-sm opacity-80">{exams.find(e=>e.id===r.examId)?.title}</TableCell>
                  <TableCell>{r.score}/{r.total}</TableCell>
                  <TableCell>{r.percentage}%</TableCell>
                  <TableCell><Badge>{r.grade}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function AnnouncementsPage({ announcements, onCreate }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Announcements</h2>
          <p className="text-sm opacity-70">Notify classes about schedules & updates.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-2xl"><MessageSquarePlus className="mr-2" size={16}/>New Announcement</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
              <DialogDescription>Students will see this in their dashboards.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <Input placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
              <Textarea placeholder="Write your message…" value={form.body} onChange={(e)=>setForm({...form, body:e.target.value})} />
              <Button onClick={()=>{ onCreate?.(form); setOpen(false); setForm({title:"", body:""}); }}>Publish</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {announcements.map((a)=>(
          <Card key={a.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">{a.title}</CardTitle>
              <CardDescription>{a.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{a.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// App Shell (No external router – lightweight tab router)
// -------------------------------------------------------------
const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "students", label: "Students", icon: Users },
  { key: "exams", label: "Exams", icon: NotebookText },
  { key: "results", label: "Results", icon: BarChart3 },
  { key: "announcements", label: "Announcements", icon: Bell },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function TeacherDashboardApp() {
  const [route, setRoute] = useState("dashboard");
  const [search, setSearch] = useState("");

  const [students, setStudents] = useState(mockStudents);
  const [exams, setExams] = useState(mockExams);
  const [results, setResults] = useState(mockResults);
  const [announcements, setAnnouncements] = useState(mockAnnouncements);

  // CRUD handlers (replace with API calls later)
  const addStudent = (payload) => {
    const id = `S-${Math.floor(Math.random()*9000)+1000}`;
    setStudents((s)=>[...s, { id, ...payload, roll: Number(payload.roll)||payload.roll }]);
  };
  const updateStudent = (id) => {
    // Demo: bump roll by +1
    setStudents((s)=> s.map(st=> st.id===id ? { ...st, roll: Number(st.roll)+1 } : st));
  };
  const deleteStudent = (id) => setStudents((s)=> s.filter(st=>st.id!==id));

  const createExam = (payload) => {
    const id = `E-${Math.floor(Math.random()*9000)+2000}`;
    setExams((e)=> [
      ...e,
      {
        id,
        title: payload.title,
        type: payload.type,
        startTime: payload.startTime,
        endTime: payload.endTime,
        status: "Draft",
        assignedTo: payload.assignedTo.split(",").map((x)=>x.trim()).filter(Boolean),
        createdBy: "Teacher-01",
      },
    ]);
  };
  const publishExam = (id) => setExams((e)=> e.map(x=> x.id===id ? { ...x, status: "Scheduled" } : x));
  const deleteExam = (id) => setExams((e)=> e.filter(x=>x.id!==id));

  const createAnnouncement = (payload) => {
    setAnnouncements((a)=> [
      { id: Math.random(), title: payload.title, body: payload.body, date: new Date().toISOString().slice(0,10) },
      ...a,
    ]);
  };

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="hidden border-r bg-background p-4 md:block">
        <div className="mb-6 px-2">
          <div className="text-xl font-extrabold">SmartExam</div>
          <div className="text-xs opacity-60">Teacher Dashboard</div>
        </div>
        <nav className="space-y-1">
          {NAV.map((n) => (
            <NavItem key={n.key} icon={n.icon} label={n.label} active={route===n.key} onClick={()=>setRoute(n.key)} />
          ))}
        </nav>
        <div className="mt-6 rounded-xl border p-3 text-xs opacity-70">
          Tip: Replace mock handlers with your REST endpoints (JWT auth + RBAC).
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-col">
        <TopBar onSearch={setSearch} />

        <AnimatePresence mode="wait">
          <motion.main
            key={route}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="min-h-0 flex-1 overflow-y-auto"
          >
            {route === "dashboard" && (
              <DashboardHome students={students} exams={exams} results={results} />
            )}
            {route === "students" && (
              <StudentsPage
                students={students}
                onAdd={addStudent}
                onUpdate={updateStudent}
                onDelete={deleteStudent}
                query={search}
              />
            )}
            {route === "exams" && (
              <ExamsPage
                exams={exams}
                onCreate={createExam}
                onPublish={publishExam}
                onDelete={deleteExam}
                query={search}
              />
            )}
            {route === "results" && (
              <ResultsPage results={results} exams={exams} />
            )}
            {route === "announcements" && (
              <AnnouncementsPage announcements={announcements} onCreate={createAnnouncement} />
            )}
            {route === "settings" && (
              <div className="p-6">
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Configure preferences for your dashboard.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    <div className="grid max-w-xl grid-cols-2 gap-3">
                      <Input placeholder="School name" />
                      <Input placeholder="Time zone" defaultValue="Asia/Kolkata" />
                      <Input placeholder="Default class" />
                      <Input placeholder="Items per page" defaultValue={10} />
                    </div>
                    <Button className="w-fit rounded-2xl">Save Changes</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}

/*
INTEGRATION NOTES (replace mocks with your APIs):

- Auth: keep teacher JWT in httpOnly cookie; add <RequireAuth> wrapper in real app.
- Students:
  GET /api/students, POST /api/students, PATCH /api/students/:id, DELETE /api/students/:id
- Exams:
  GET /api/exams, POST /api/exams, PATCH /api/exams/:id (publish), DELETE /api/exams/:id
- Results:
  GET /api/results?examId=E-2001
- Announcements:
  GET/POST /api/announcements

Hook up with react-query/RTK Query for caching, and zod + react-hook-form for validation.
*/
