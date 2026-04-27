import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AppointmentModal from './AppointmentModal';
import './Calendar.css';

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Dummy patients data - replace with actual data
  const patients = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
  ];

  const handleDateSelect = (selectInfo) => {
    setSelectedSlot({
      date: selectInfo.start.toISOString().split('T')[0],
      time: selectInfo.start.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      duration: Math.round((selectInfo.end - selectInfo.start) / (1000 * 60)) // Duration in minutes
    });
    setModalOpen(true);
  };

  const handleQuickSchedule = () => {
    setSelectedSlot(null); // No pre-selected slot
    setModalOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm('Deseja cancelar esta consulta?')) {
      clickInfo.event.remove();
      setAppointments(prev => 
        prev.filter(apt => apt.id !== clickInfo.event.id)
      );
    }
  };

  const handleSaveAppointment = (formData) => {
    const newAppointment = {
      id: Date.now(),
      title: `${patients.find(p => p.id === parseInt(formData.patientId)).firstName} ${patients.find(p => p.id === parseInt(formData.patientId)).lastName}`,
      start: `${formData.date}T${formData.time}`,
      end: new Date(new Date(`${formData.date}T${formData.time}`).getTime() + parseInt(formData.duration) * 60000).toISOString(),
      extendedProps: {
        patientId: formData.patientId,
        notes: formData.notes
      }
    };

    setAppointments(prev => [...prev, newAppointment]);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Calendário de Consultas</h2>
        <button 
          className="quick-schedule-btn"
          onClick={handleQuickSchedule}
        >
          + Nova Consulta
        </button>
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          slotMinTime="08:00:00"
          slotMaxTime="19:00:00"
          slotDuration="00:30:00"
          events={appointments}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          editable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          allDaySlot={false}
          locale="pt"
          buttonText={{
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia'
          }}
        />
      </div>

      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedSlot(null);
        }}
        onSave={handleSaveAppointment}
        selectedSlot={selectedSlot}
        patients={patients}
      />
    </div>
  );
}

export default Calendar;