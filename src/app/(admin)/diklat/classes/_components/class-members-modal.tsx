"use client";

import { Modal, ModalHeader, ModalTitle, ModalBody, ModalClose } from "@/components/ui/modal";
import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";
import { useClassParticipants, useAddClassParticipant, useRemoveClassParticipant, useClassInstructors, useAddClassInstructor, useRemoveClassInstructor } from "@/features/class/hooks/use-class-members";
import { useUsers } from "@/features/rbac/user/hooks/use-user";
import { useState } from "react";
import { Trash2, UserPlus } from "lucide-react";

interface ClassMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: any | null;
}

export function ClassMembersModal({ isOpen, onClose, classData }: ClassMembersModalProps) {
  const classId = classData?.id;
  
  const { data: usersData = [] } = useUsers();
  
  // Participants
  const { data: participantsRes } = useClassParticipants(classId);
  const participants = participantsRes?.data || [];
  const addParticipant = useAddClassParticipant();
  const removeParticipant = useRemoveClassParticipant();
  const [selectedParticipant, setSelectedParticipant] = useState("");

  // Instructors
  const { data: instructorsRes } = useClassInstructors(classId);
  const instructors = instructorsRes?.data || [];
  const addInstructor = useAddClassInstructor();
  const removeInstructor = useRemoveClassInstructor();
  const [selectedInstructor, setSelectedInstructor] = useState("");

  const availableParticipants = usersData.filter((u: any) => u.role?.code === 'PARTICIPANT' && !participants.some((p: any) => p.participant_id === u.id));
  const availableInstructors = usersData.filter((u: any) => u.role?.code === 'INSTRUCTOR' && !instructors.some((i: any) => i.instructor_id === u.id));

  const handleAddParticipant = () => {
    if (!selectedParticipant) return;
    addParticipant.mutate({ classId, participant_id: Number(selectedParticipant) }, {
      onSuccess: () => setSelectedParticipant("")
    });
  };

  const handleAddInstructor = () => {
    if (!selectedInstructor) return;
    addInstructor.mutate({ classId, instructor_id: Number(selectedInstructor) }, {
      onSuccess: () => setSelectedInstructor("")
    });
  };

  if (!classData) return null;

  return (
    <Modal open={isOpen} onClose={onClose} className="max-w-4xl h-[80vh] flex flex-col">
      <ModalHeader>
        <ModalTitle className="text-xl">Kelola Member: Kelas {classData.course?.title} (Batch {classData.batch_name})</ModalTitle>
        <ModalClose onClose={onClose} />
      </ModalHeader>

      <ModalBody className="p-0 overflow-hidden flex flex-col">
        <Tabs defaultValue="participants" className="flex-1 overflow-hidden flex flex-col h-full">
          <div className="px-6 pt-4">
            <TabList className="w-full grid grid-cols-2">
              <Tab value="participants">Peserta ({participants.length})</Tab>
              <Tab value="instructors">Instruktur ({instructors.length})</Tab>
            </TabList>
          </div>
          
          <TabPanel value="participants" className="flex-1 overflow-y-auto px-6 py-4">
            <div className="flex gap-2 mb-6">
              <select 
                className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={selectedParticipant}
                onChange={(e) => setSelectedParticipant(e.target.value)}
              >
                <option value="">-- Pilih Peserta Baru --</option>
                {availableParticipants.map((u: any) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
              <button 
                onClick={handleAddParticipant}
                disabled={!selectedParticipant || addParticipant.isPending}
                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
              >
                <UserPlus className="size-4" /> Tambah
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3">Nama Peserta</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {participants.length === 0 ? (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-400">Belum ada peserta di kelas ini</td></tr>
                  ) : participants.map((p: any) => (
                    <tr key={p.participant_id} className="bg-white hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                      <td className="px-4 py-3">{p.email}</td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => {
                            if(confirm("Keluarkan peserta dari kelas?")) {
                              removeParticipant.mutate({ classId, participantId: p.participant_id });
                            }
                          }}
                          className="text-red-500 hover:bg-red-50 p-1.5 rounded"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          <TabPanel value="instructors" className="flex-1 overflow-y-auto px-6 py-4">
            <div className="flex gap-2 mb-6">
              <select 
                className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
              >
                <option value="">-- Pilih Instruktur Baru --</option>
                {availableInstructors.map((u: any) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
              <button 
                onClick={handleAddInstructor}
                disabled={!selectedInstructor || addInstructor.isPending}
                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
              >
                <UserPlus className="size-4" /> Tambah
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3">Nama Instruktur</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {instructors.length === 0 ? (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-400">Belum ada instruktur di kelas ini</td></tr>
                  ) : instructors.map((i: any) => (
                    <tr key={i.instructor_id} className="bg-white hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{i.name}</td>
                      <td className="px-4 py-3">{i.email}</td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => {
                            if(confirm("Hapus instruktur dari kelas?")) {
                              removeInstructor.mutate({ classId, instructorId: i.instructor_id });
                            }
                          }}
                          className="text-red-500 hover:bg-red-50 p-1.5 rounded"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
        </Tabs>
      </ModalBody>
    </Modal>
  );
}
